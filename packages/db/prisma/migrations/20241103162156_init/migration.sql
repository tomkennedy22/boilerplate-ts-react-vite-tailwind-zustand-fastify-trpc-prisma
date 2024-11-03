-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "createdDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" TEXT NOT NULL PRIMARY KEY,
    "createdDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostLike" (
    "createdDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDt" DATETIME NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "userId"),
    CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("postId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
