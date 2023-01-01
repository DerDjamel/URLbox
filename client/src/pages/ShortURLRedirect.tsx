import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ShortURLRedirect = () => {
    const { code } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function redirect(code: string) {
        setLoading(true);
        try {
            const shortURLResult = await api.get(`/api/url/${code}`);
            window.location.href = shortURLResult.data.url.original;
            return null;
        } catch (error) {
            setErrorMessage('A URL with this code does not exists.');
        }
        setLoading(false);
    }

    useEffect(() => {
        if (code) redirect(code);
        else setErrorMessage('Please provide a code');
    }, []);

    return (
        <div className="w-screen h-screen App bg-light-primary dark:bg-dark-primary flex justify-center items-center text-zinc-100 font-bold">
            {loading ? <div>Loading...</div> : <div>{errorMessage}</div>}
        </div>
    );
};

export default ShortURLRedirect;
