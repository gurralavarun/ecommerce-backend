const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
    getProfile,
    getAdminTest,
    updateProfile,
    changePassword,
    deleteAccount,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and account APIs
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/profile",
    authenticateToken,
    getProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Varun Updated
 *               email:
 *                 type: string
 *                 format: email
 *                 example: varun.updated@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid profile data
 *       401:
 *         description: Authentication required
 */
router.put(
    "/profile",
    authenticateToken,
    updateProfile
);

/**
 * @swagger
 * /api/users/password:
 *   put:
 *     summary: Change the logged-in user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: Current@123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect or new password is invalid
 *       401:
 *         description: Authentication required
 */
router.put(
    "/password",
    authenticateToken,
    changePassword
);

/**
 * @swagger
 * /api/users/account:
 *   delete:
 *     summary: Delete the logged-in user's account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       400:
 *         description: User account could not be deleted
 *       401:
 *         description: Authentication required
 */
router.delete(
    "/account",
    authenticateToken,
    deleteAccount
);

/**
 * @swagger
 * /api/users/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
    "/admin/users",
    authenticateToken,
    authorizeRole("ADMIN"),
    getAllUsers
);

/**
 * @swagger
 * /api/users/admin/users/{id}:
 *   put:
 *     summary: Update a user's role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 enum:
 *                   - 1
 *                   - 2
 *                 example: 1
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role or user data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
router.put(
    "/admin/users/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    updateUserRole
);

/**
 * @swagger
 * /api/users/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
router.delete(
    "/admin/users/:id",
    authenticateToken,
    authorizeRole("ADMIN"),
    deleteUser
);

/**
 * @swagger
 * /api/users/admin-test:
 *   get:
 *     summary: Test admin-only access
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access confirmed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied because the user is not an admin
 */
router.get(
    "/admin-test",
    authenticateToken,
    authorizeRole("ADMIN"),
    getAdminTest
);

module.exports = router;