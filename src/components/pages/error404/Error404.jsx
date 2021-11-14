import React from 'react'
import "./Error404.css"

const Error404 = () => {
    return (
        <section className="errorPage">
            <div className="titulo">ERROR 404: página no encontrada</div>
            <p className="errorMsg404">La página buscada no pudo ser conseguida. Verifica el URL e intenta otra vez.</p>   
        </section>
    )
}

export default Error404
