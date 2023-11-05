import db from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, ctx) {
    await db.connect()
    const id = ctx.params.id

    try {
        const product = await Product.findById(id)
        return new Response(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}