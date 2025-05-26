"use client";
import { useState } from "react";
import AddCommentaire from "./addCommentaire";
import ListCommentaire from "./listCommentaire";

export default function CommentaireSection({ idItem }) {
    const [rafraichir, setRafraichir] = useState(false);

    const handleCommentaireAjoute = () => {
        setRafraichir(prev => !prev);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <AddCommentaire idItem={idItem} onCommentaireAjoute={handleCommentaireAjoute} />
            </div>
            <div className="col-md-6">
                <ListCommentaire idItems={idItem} rafraichir={rafraichir} />
            </div>
        </div>
    );
}