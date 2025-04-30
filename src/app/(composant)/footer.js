export default function footer() {
    return <>
        <footer className="container-fluid bg-tertiary">
            <div className="justify-content-center text-center p-3">
                <i className="bi bi-facebook p-4 socialMedia"></i>
                <i className="bi bi-twitter p-4 socialMedia"></i>
                <i className="bi bi-instagram p-4 socialMedia"></i>
            </div>
            <p className="text-center m-0 pb-3">Copyright &copy; GrindHunter 2025</p>
        </footer>


        {/*Mettre mes scripts*/}
        <script src="https://unpkg.com/localbase/dist/localbase.dev.js"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.14.1/jquery-ui.min.js" integrity="sha256-AlTido85uXPlSyyaZNsjJXeCs07eSv3r43kyCVc8ChI=" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </>

}