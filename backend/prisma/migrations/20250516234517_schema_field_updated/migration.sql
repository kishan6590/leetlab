/*
  Warnings:

  - You are about to drop the column `codeSnippet` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `codeSnippets` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "codeSnippet",
DROP COLUMN "tag",
ADD COLUMN     "codeSnippets" JSONB NOT NULL,
ADD COLUMN     "tags" TEXT[];
