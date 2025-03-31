import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, phone, address } = req.body;

        try {
            // Update the Admin model with the new information
            const updatedAdmin = await prisma.admin.update({
                where: { Admin_ID: "A123" }, // Replace "A123" with the actual admin ID or pass it dynamically
                data: {
                    Admin_ner: name,
                    login_name: email,
                    // Additional fields can be updated here if they exist in the Admin model
                },
            });

            res.status(200).json({ message: "Admin profile updated successfully", updatedAdmin });
        } catch (error) {
            console.error("Error updating admin profile:", error);
            res.status(500).json({ message: "Failed to update admin profile", error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
