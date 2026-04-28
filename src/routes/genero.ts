import { Router, type Request, type Response } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const generos = await prisma.genero.findMany();
        res.json(generos);
    } catch (ex) {
        res.status(500).json({ erro: "Erro ao buscar gêneros" });
    }
});

// router.post("/", (req: Request, res: Response) => {
//     const {nome} = req.body

//     if(!nome || nome.trim() === "") {
//         return res.status(400).json(
//             { erro: "O nome do gênero é obrigatório." }
//         );
//     }

//     db.run(
//         "INSERT INTO generos (nome) VALUES (?)",
//         [nome],
//         function (erro) {
//             if(erro) {
//                 return res.status(500).json(
//                     { erro: "Erro ao cadastrar gênero." }
//                 );
//             }

//             res.status(201).json({
//                 id: this.lastID,
//                 nome,
//             })
//         }
//     );
// });

router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome } = req.body;

        if (!nome || nome.trim() === "") {
            return res.status(400).json({ 
                erro: "O nome do gênero é obrigatório." 
            });
        }

        const novoGenero = await prisma.genero.create({
            data: {
                nome: nome.trim(),
            },
        });

        res.status(201).json(novoGenero);
    } catch (ex) {
        res.status(500).json({ 
            erro: "Erro ao cadastrar gênero." 
        });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    try {
        const genero = await prisma.genero.update({
            where: { id },
            data: { nome },
        });
        res.json(genero);
    } catch (ex: any) {
        if (ex?.code === "P2025") {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }
        res.status(500).json({ erro: "Erro ao atualizar gênero." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        await prisma.genero.delete({ where: { id } });
        res.status(204).send();
    } catch (ex: any) {
        if (ex?.code === "P2025") {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }
        res.status(500).json({ erro: "Erro ao excluir gênero." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const genero = await prisma.genero.findUnique({ where: { id } });

        if (!genero) {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }

        res.json(genero);
    } catch (ex) {
        res.status(500).json({ erro: "Erro ao buscar gênero." });
    }
});

export default router;