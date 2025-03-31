// pages/api/admin/settings/password.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // Check if the request is a POST request
    if (req.method === 'POST') {
        const { adminId, oldPassword, newPassword } = req.body;

        try {
            // Validate that all required fields are provided
            if (!adminId || !oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Fetch the admin record from the database by adminId
            const admin = await prisma.admin.findUnique({
                where: { Admin_ID: adminId },
            });

            // If the admin is not found, return a 404 error
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Verify if the old password matches the stored hash
            const isPasswordValid = await bcrypt.compare(oldPassword, admin.login_password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the admin's password in the database
            await prisma.admin.update({
                where: { Admin_ID: adminId },
                data: { login_password: hashedPassword },
            });

            // Return a success response
            return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Error updating password:', error);
            return res.status(500).json({ message: 'Failed to update password', error: error.message });
        }
    } else {
        // If the method is not POST, return a 405 Method Not Allowed response
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
