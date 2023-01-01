import NavigationBar from '../components/NavigationBar';
import { FaLink as UrlIcon } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import api from '../api';

type URLtype = {
    id: string;
    original: string;
    short: string;
    code: string;
    created_at?: string;
};

function App() {
    const [disableAllInputs, setDisableAllInputs] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    let originalRef = useRef<number | undefined>(undefined);
    let codeRef = useRef<number | undefined>(undefined);
    // original URL == Long URL
    const [original, setOriginal] = useState<string>('');
    const [short, setShort] = useState<URLtype | null>(null);

    const [code, setCode] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');

    function handleOriginalURLOnChange() {
        clearTimeout(originalRef.current);
        setErrorMessage('');
        setLoading(true);
        setDisableAllInputs(true);
        originalRef.current = setTimeout(async () => {
            try {
                const shortURLResult = await api.post('/api/url/original', {
                    original
                });
                setShort(shortURLResult.data.url);
            } catch (error: any) {
                if (error.response.status === 404) {
                    // no need to show the error message, because there is no URL in the DB
                    return;
                }
                setErrorMessage(error.response.data.error_message);
            }
        }, 300);
        setDisableAllInputs(false);
        setLoading(false);
    }

    function handleCodeOnChange() {
        clearTimeout(codeRef.current);
        setErrorMessage('');
        setLoading(true);
        setDisableAllInputs(true);
        codeRef.current = setTimeout(async () => {
            try {
                const shortURLResult = await api.get(`/api/url/${code}`);
                setErrorMessage('A URL with this code already exists.');
            } catch (error: any) {
                if (error.response.status === 404) {
                    // no need to show the error message, because there is no URL in the DB
                    return;
                }
                setErrorMessage(error.response.data.error_message);
            }
        }, 300);
        setDisableAllInputs(false);
        setLoading(false);
    }

    async function onClickHandler(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        setDisableAllInputs(true);

        try {
            if (!original) {
                setErrorMessage('Form fields are missing!');
                return;
            }
            const shorturl = await api.post('/api/url/', {
                original,
                code
            });
            setShort(shorturl.data.url as URLtype);
        } catch (error: any) {
            setErrorMessage(error.response.data.error_message);
        } finally {
            setLoading(false);
            setDisableAllInputs(false);
        }
    }

    useEffect(() => {
        if (original) handleOriginalURLOnChange();
    }, [original]);

    useEffect(() => {
        if (code) handleCodeOnChange();
    }, [code]);

    return (
        <div className="w-screen h-screen App bg-light-primary dark:bg-dark-primary">
            <section className="flex items-center justify-center w-screen h-70 gap-1 pt-10 text-zinc-50">
                <form className="flex flex-col justify-center w-full h-full gap-2 px-4 sm:w-4/5 md:w-[32rem]">
                    <header className="flex justify-start w-full">
                        <div className="mb-2">
                            <h3 className="text-xl font-bold w-fit">
                                Paste your URL
                            </h3>
                        </div>
                    </header>
                    <div>
                        <label htmlFor="orginal_url" className="relative">
                            <input
                                value={original}
                                onChange={(e) => {
                                    setOriginal(e.target.value);
                                }}
                                name="orginal_url"
                                type="text"
                                placeholder="Paste your URL"
                                className="w-full py-2 pl-12 pr-2 rounded outline-none text-zinc-600"
                                disabled={disableAllInputs}
                            />
                            <UrlIcon className="absolute inset-y-0 left-4 fill-light-primary"></UrlIcon>
                        </label>
                        <div className="flex justify-between w-full gap-1 my-4 align-center">
                            <input
                                name="orginal_url"
                                type="text"
                                value={'localhost:5173'}
                                size={'localhost:5173'.length}
                                disabled
                                className="pl-2 py-2 rounded outline-none text-zinc-600 w-fit"
                            />
                            <span className="inline-block p-2 font-bold">
                                /
                            </span>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                type="text"
                                name="code"
                                pattern={'^[-a-zA-Z0-9]+$'}
                                placeholder="Your custom code"
                                className="p-2 rounded outline-none text-zinc-800 grow"
                                disabled={disableAllInputs}
                            />
                        </div>
                    </div>
                    <div className="max-w-md">
                        <p
                            className="my-2"
                            style={{
                                visibility: errorMessage ? 'visible' : 'hidden'
                            }}>
                            {errorMessage}
                        </p>
                        <button
                            type="submit"
                            onClick={(e) => {
                                onClickHandler(e);
                            }}
                            disabled={!!errorMessage}
                            className="px-10 py-2 disabled:opacity-75 font-medium border-r-2 rounded-md bg-zinc-50 text-light-primary">
                            {loading ? 'loading...' : 'Shorten'}
                        </button>
                        <p
                            className="my-4 bg-zinc-50 p-3 rounded text-gray-800"
                            style={{
                                visibility: short ? 'visible' : 'hidden'
                            }}>
                            {short?.short}
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default App;
