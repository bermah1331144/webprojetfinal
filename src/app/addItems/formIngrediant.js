"use client";

export default function FormIngrediant() {
    return <>
                <div>
                    <form id="recette-igendiants">
                        <div className="mb-3">
                            <label htmlFor="ingredient1" className="form-label">Ingrédient 1:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient1"
                                name="ingredient1"
                                
                            />
                        </div>

                        <div className="mb-3">    
                            <label htmlFor="ingredient2" className="form-label">Ingrédient 2:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient2"
                                name="ingredient2"
                                
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ingredient3" className="form-label">Ingrédient 3:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient3"
                                name="ingredient3"
                            />
                        </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn custom-btn mt-3" type="submit">Ajouter</button>
                            </div>
                    </form>
                </div>
    
    
    </>;
}