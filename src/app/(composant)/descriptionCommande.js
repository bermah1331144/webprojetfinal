export default function({articles}){
    console.log(articles);

    const totalArticles = articles.reduce((acc, article) => acc + article.quantite, 0);
    const totalPrixHT = articles.reduce((acc, article) => acc + ((article.item?.prixVente || 0) * article.quantite), 0);
    const TVQ = totalPrixHT * 0.0975;
    const TPS = totalPrixHT * 0.05;

    return<>
        <div className="row">
            <h3>Résumé du Panier</h3>
            {articles.map((article) => (
                <div key={article.item.id}  className="d-flex p-0">
                    <p className='col-8 border border-primary m-0 p-0'>{article.item.nom}</p>
                    <p className='col-1 border border-primary m-0 p-0 text-end pe-1'>{article.quantite}</p>
                    <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{(article.item.prixVente * article.quantite).toFixed(2)} $</p>
                </div>
            ))}
            <p className='col-8 border border-primary m-0 p-0 ps-1'><strong>Sous total</strong></p>
            <p className='col-1 border border-primary m-0 p-0 text-end pe-1'>{totalArticles}</p>
            <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{totalPrixHT} $</p>
            <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>TVQ</strong></p>
            <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{TVQ.toFixed(2)} $</p>
            <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>TPS</strong></p>
            <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{TPS.toFixed(2)} $</p>
            <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>Total</strong></p>
            <p className='col-3 border border-primary m-0 p-0 text-end pe-1'><strong>{(totalPrixHT + TVQ + TPS).toFixed(2)} $</strong></p>
        </div>
    </>
}