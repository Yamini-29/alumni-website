import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type GalleryFolderWithImages = Prisma.GalleryFolderGetPayload<{
  include: { images: true };
}>;

type GalleryFolderInput = {
  eventName: string;
  eventDate: string;
  coverImage: string;
  images: string[];
};

export class GalleryService {

  private static toViewModel(folder: GalleryFolderWithImages) {
    return {
      id: folder.id,
      eventName: folder.eventName,
      eventDate: folder.eventDate,
      createdDate: folder.createdAt.toISOString(),
      description: "",
      coverImage: folder.coverImage,
      photos: folder.images.map((image) => ({
        id: image.id,
        url: image.imageUrl,
        uploadedDate: image.createdAt.toISOString(),
      })),
    };
  }

  static async getAllFolders() {
    const folders = await prisma.galleryFolder.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return folders.map((folder) => this.toViewModel(folder));
  }

  static async createFolder(data: GalleryFolderInput) {

    const folder = await prisma.galleryFolder.create({
      data: {
        eventName: data.eventName,
        eventDate: data.eventDate,
        coverImage: data.coverImage,

        images: {
          create: data.images.map((img) => ({
            imageUrl: img,
          })),
        },
      },

      include: {
        images: true,
      },
    });

    return this.toViewModel(folder);
  }

  static async updateFolder(id: string, data: GalleryFolderInput) {
    await prisma.galleryImage.deleteMany({
      where: {
        folderId: id,
      },
    });

    const folder = await prisma.galleryFolder.update({
      where: { id },

      data: {
        eventName: data.eventName,
        eventDate: data.eventDate,
        coverImage: data.coverImage,

        images: {
          create: data.images.map((img: string) => ({
            imageUrl: img,
          })),
        },
      },

      include: {
        images: true,
      },
    });

    return this.toViewModel(folder);
  }

  static async deleteFolder(id: string) {
    return prisma.galleryFolder.delete({
      where: { id },
    });
  }

}