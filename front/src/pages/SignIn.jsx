import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function SignIn() {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        // Mettre à jour formData
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // fonction permettant à la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            // requette vers Api(backend)
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                // corps de notre requette(contenu)
                body: JSON.stringify(formData)
            });
            // La reponse de la requette
            const data = await res.json();
            // Si la requette echoue
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            };
            // Si la requette est ok
            setLoading(false)
            setError(null)
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }


    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Connexion</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input type="email" className="border p-3 rounded-lg"
                    placeholder="Entrez votre email" id="email" onChange={handleChange} />
                <input type="password" className="border p-3 rounded-lg"
                    placeholder="Entrez votre mot de passe" id="password" onChange={handleChange} />
                <button disabled={loading} className="bg-slate-700 text-white p-3 
            rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? 'Loading' : 'Connexion'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Vous n'avez pas un compte ?</p>
                <Link to={'/sign-up'}>
                    <span className="text-blue-700">Inscrivez-vous</span>
                </Link>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>

    )
}

export default SignIn