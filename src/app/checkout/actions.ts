"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/app/data/products";

type CheckoutInput = {
  requestId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: {
    id: string;
    quantity: number;
  }[];
};

type CheckoutResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const text = value.trim();

  return text.length > 0 && text.length <= maxLength
    ? text
    : null;
}

export async function placeOrder(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Please sign in before placing an order.",
      };
    }

    if (
      !input ||
      typeof input.requestId !== "string" ||
      !uuidPattern.test(input.requestId)
    ) {
      return {
        success: false,
        error: "Invalid checkout request. Reload and try again.",
      };
    }

    const name = cleanText(input.name, 100);
    const phone = cleanText(input.phone, 25);
    const address = cleanText(input.address, 300);
    const city = cleanText(input.city, 100);
    const postalCode = cleanText(input.postalCode, 20);

    if (!name || !phone || !address || !city || !postalCode) {
      return {
        success: false,
        error: "Enter valid delivery details in every field.",
      };
    }

    if (!/^\+?[0-9\s()-]{7,25}$/.test(phone)) {
      return {
        success: false,
        error: "Enter a valid phone number.",
      };
    }

    if (
      !Array.isArray(input.items) ||
      input.items.length === 0 ||
      input.items.length > 50
    ) {
      return {
        success: false,
        error: "Your cart is empty or contains too many items.",
      };
    }

    const seen = new Set<string>();
    const orderItems = [];

    for (const item of input.items) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        seen.has(item.id)
      ) {
        return {
          success: false,
          error: "Invalid cart items. Review your cart and try again.",
        };
      }

      const product = products.find(
        (product) => product.id === item.id,
      );

      if (!product || item.quantity > product.stock) {
        return {
          success: false,
          error: "A product is unavailable in the selected quantity.",
        };
      }

      seen.add(item.id);

      orderItems.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        priceCents: Math.round(product.price * 100),
      });
    }

    const subtotalCents = orderItems.reduce(
      (total, item) => total + item.priceCents * item.quantity,
      0,
    );

    // Demo shipping: free from $100; otherwise $5.
    const shippingCents = subtotalCents >= 10000 ? 0 : 500;
    const totalCents = subtotalCents + shippingCents;

    const result = await db.query<{ id: string }>(
      `
        INSERT INTO orders (
          id, user_id, request_id, customer_name,
          email, phone, address, city, postal_code,
          items, subtotal_cents, shipping_cents, total_cents,
          payment_method
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10::jsonb, $11, $12, $13, 'cod'
        )
        ON CONFLICT (user_id, request_id) DO NOTHING
        RETURNING id
      `,
      [
        randomUUID(),
        session.user.id,
        input.requestId,
        name,
        session.user.email,
        phone,
        address,
        city,
        postalCode,
        JSON.stringify(orderItems),
        subtotalCents,
        shippingCents,
        totalCents,
      ],
    );

    if (result.rows[0]) {
      return {
        success: true,
        orderId: result.rows[0].id,
      };
    }

    const existing = await db.query<{ id: string }>(
      `
        SELECT id FROM orders
        WHERE user_id = $1 AND request_id = $2
      `,
      [session.user.id, input.requestId],
    );

    if (existing.rows[0]) {
      return {
        success: true,
        orderId: existing.rows[0].id,
      };
    }

    return {
      success: false,
      error: "Could not save your order. Please try again.",
    };
  } catch {
    return {
      success: false,
      error: "Could not place your order. Please try again.",
    };
  }
}