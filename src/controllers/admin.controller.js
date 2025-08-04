import adminService from "../services/admin.service.js";
import jwt from "jsonwebtoken";

// Função para criar um novo admin
const create = async (req, res) => {
  try {
    const { name, matricula, password } = req.body;

    if (!name || !matricula || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Cria o admin
    const admin = await adminService.create({ name, matricula, password });

    // Retornar o admin
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        matricula: admin.matricula,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    res.status(500).json({ message: "Internal server error", error });
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await adminService.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// No controller de admin, a função para listar todos os usuários
const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll(); // Aqui busca todos os usuários
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminService.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, matricula, password } = req.body;

    // Obtém a role do usuário do objeto 'req.user'
    const loggedInUserRole = req.user.role;
    const loggedInUserId = req.userId;

    // Regra de segurança: Verifica se o usuário logado pode fazer a alteração.
    if (loggedInUserRole !== "super_admin" && id !== loggedInUserId) {
      return res.status(403).json({
        message:
          "Proibido: Você não tem permissão para atualizar este administrador.",
      });
    }

    let dataToUpdate = {};

    // Regra de negócio: Filtra os campos que podem ser atualizados.
    if (loggedInUserRole === "super_admin") {
      dataToUpdate = { name, matricula, password };
    } else {
      dataToUpdate = { name, password };
    }

    // Remove a senha do objeto se ela não tiver sido enviada.
    if (!password) {
      delete dataToUpdate.password;
    }

    // Executa a atualização com os dados filtrados.
    const admin = await adminService.update(id, dataToUpdate);

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    res
      .status(200)
      .json({ message: "Administrador atualizado com sucesso.", admin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor.", error: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserRole = req.user.role;
    const loggedInUserId = req.userId;

    // 1. Verificação de Permissão
    // Apenas um super_admin pode excluir outros administradores.
    if (loggedInUserRole !== "super_admin") {
      return res.status(403).json({
        message:
          "Proibido: Apenas super_admins podem excluir outros administradores.",
      });
    }

    // 2. Verificação de Auto-exclusão
    // Um super_admin não pode excluir a si mesmo.
    if (id === loggedInUserId) {
      return res.status(403).json({
        message: "Proibido: Um super_admin não pode excluir a própria conta.",
      });
    }

    // 3. Verifica se o admin a ser excluído existe e se é super_admin
    const admin = await adminService.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    // A lógica de impedir a exclusão de outros super_admins já está correta,
    // mas vamos reforçá-la para clareza.
    if (admin.role === "super_admin") {
      return res.status(403).json({
        message: "Proibido: Não é possível excluir um super_admin.",
      });
    }

    // 4. Executa a exclusão
    await adminService.remove(id);
    res.status(200).json({ message: "Administrador excluído com sucesso." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor.", error });
  }
};

const countAdmins = async (req, res) => {
  try {
    const totalAdmins = await adminService.countDocumentsService();
    res.status(200).send({ total: totalAdmins });
  } catch (err) {
    console.error("Erro ao contar admins:", err);
    res.status(500).send({ message: "Erro interno do servidor." });
  }
};

export default {
  create,
  findAll,
  findAllUsers,
  findById,
  update,
  remove,
  countAdmins,
};
