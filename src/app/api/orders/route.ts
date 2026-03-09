import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateOrderNumber } from "@/lib/utils";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const productId = formData.get("productId") as string;
    const customerName = formData.get("buyerName") as string;
    const customerEmail = formData.get("buyerEmail") as string;
    const customerPhone = formData.get("buyerPhone") as string | null;
    const paymentMethod = formData.get("paymentMethod") as string;
    const notes = formData.get("notes") as string | null;
    const proofFile = formData.get("proofFile") as File | null;

    if (!productId || !customerName || !customerEmail || !paymentMethod) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });

    let proofPath: string | null = null;
    if (proofFile && proofFile.size > 0) {
      const uploadDir = process.env.UPLOAD_DIR || "./public/uploads";
      await fs.mkdir(uploadDir, { recursive: true });
      const ext = proofFile.name.split(".").pop();
      const fileName = `proof_${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await proofFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      proofPath = `/uploads/${fileName}`;
    }

    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        buyerName: customerName,
        buyerEmail: customerEmail,
        buyerPhone: customerPhone || "",
        paymentMethod,
        proofImageUrl: proofPath,
        notes: notes || null,
        totalAmount: product.price,
        items: {
          create: {
            productId: product.id,
            price: product.price,
            quantity: 1,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل إنشاء الطلب" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const orders = await prisma.order.findMany({
    where: status ? { orderStatus: status } : {},
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}
