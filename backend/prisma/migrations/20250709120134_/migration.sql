/*
  Warnings:

  - A unique constraint covering the columns `[userId,problemId]` on the table `ProblemSolved` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProblemSolved_problemId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProblemSolved_userId_problemId_key" ON "ProblemSolved"("userId", "problemId");
