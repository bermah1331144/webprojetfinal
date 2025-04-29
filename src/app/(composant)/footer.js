export default function footer() {
    return <>
        <footer className="container-fluid bg-secondary">
            <div className="justify-content-center text-center p-3">
                <i className="bi bi-facebook p-4 socialMedia"></i>
                <i className="bi bi-twitter p-4 socialMedia"></i>
                <i className="bi bi-linkedin p-4 socialMedia"></i>
            </div>
            <p className="text-center open-sans">Centre de d'expertise et de perfectionnement en informatique</p>
            <p className="text-center open-sans">2022</p>
        </footer>


        {/*Mettre mes scripts*/}
        <script src="https://unpkg.com/localbase/dist/localbase.dev.js"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.14.1/jquery-ui.min.js" integrity="sha256-AlTido85uXPlSyyaZNsjJXeCs07eSv3r43kyCVc8ChI=" crossOrigin="anonymous"></script>
    </>

}