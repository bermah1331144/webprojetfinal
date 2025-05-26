import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { nom, prenom, email, password, confirmerPassword } = await req.json();

        if (password !== confirmerPassword) {
            return NextResponse.json({ message: 'Les mots de passe doivent correspondre' }, { status: 400 });
        }

        const utilisateurs = await fetch('http://localhost:3001/utilisateurs');
        const utilisateursJson = await utilisateurs.json();

        const utilisateur = utilisateursJson.find(u => u.email === email);
        if (utilisateur) {
            return NextResponse.json({ message: 'Utilisateur deja existant' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const reponse = await fetch('http://localhost:3001/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, prenom, email, password: hashedPassword, roleId: "2" })
        });

        if (!reponse.ok) {
            return NextResponse.json({ message: 'Erreur lors de l\'inscription' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Inscription reussie' }, { status: 200 });
    } catch (error) {
        console.error('Erreur serveur :', error);
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }

}