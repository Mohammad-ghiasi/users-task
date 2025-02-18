"use server";

import { revalidatePath } from "next/cache";

export async function cashDeleter() {
  revalidatePath("/users");
}
