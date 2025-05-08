import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const manager = await prisma.manager.findUnique({
            where: { cognitoId },
        });

        if (manager) {
            res.json(manager);
        } else {
            res.status(404).json({ message: "Manager not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error getting manager: ${error}` });
    }
};

export const createManager = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });

        res.status(201).json(manager);
    } catch (error) {
        res.status(500).json({ message: `Error creating manager: ${error}` });
    }
};

export const updateManager = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateManager = await prisma.manager.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });

        res.json(updateManager);
    } catch (error) {
        res.status(500).json({ message: `Error updating manager: ${error}` });
    }
};
