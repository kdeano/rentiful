import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId },
            include: {
                favorites: true,
            },
        });

        if (tenant) {
            res.json(tenant);
        } else {
            res.status(404).json({ message: "Tenant not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error getting tenant: ${error}` });
    }
};

export const createTenant = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const tenant = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });

        res.status(201).json(tenant);
    } catch (error) {
        res.status(500).json({ message: `Error creating tenant: ${error}` });
    }
};

export const updateTenant = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateTenant = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });

        res.json(updateTenant);
    } catch (error) {
        res.status(500).json({ message: `Error updating tenant: ${error}` });
    }
};

export const getCurrentResidences = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cognitoId } = req.params;

        const properties = await prisma.property.findMany({
            where: { tenants: { some: { cognitoId } } },
            include: {
                location: true,
            },
        });

        const residencesWithFormattedLocation = await Promise.all(
            properties.map(async (property) => {
                const coordinates: { coordinates: string }[] =
                    await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

                const geoJSON: any = wktToGeoJSON(
                    coordinates[0]?.coordinates ?? ""
                );
                const longitude = geoJSON.coordinates[0];
                const latitude = geoJSON.coordinates[1];

                return {
                    ...property,
                    location: {
                        ...property.location,
                        coordinates: {
                            longitude,
                            latitude,
                        },
                    },
                };
            })
        );

        res.json(residencesWithFormattedLocation);
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving tenant residences: ${error}`,
        });
    }
};
