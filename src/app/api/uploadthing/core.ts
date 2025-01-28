import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { utapi } from "@/server/uploadthings";
const f = createUploadthing();

// Fake auth function
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Return metadata that will be available in onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs AFTER upload, modifying the file name before or during handling.

      // The correct property to use is `file.name`
      const originalName = file.name;
      const newFileName = `Yash_${originalName}`; // Rename the file as per your logic
      await utapi.renameFiles({
        fileKey: file.key,
        newName: newFileName,
      });
      console.log("File renamed to:", newFileName);
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Return the result with the new file name and other metadata
      return { uploadedBy: metadata.userId, renamedFileName: newFileName };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
