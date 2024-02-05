import useSWR from 'swr';

function useFetchImages(searchTerm) {
    const link = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(searchTerm)}&client_id=MtB1tGBfBByW-fC6Pv7ZlJT03WsVMFIeuLaP_eGrGvE`;
    const fetcher = () => {
        return fetch(link).then(res => {
            return res.json()
        }).then(data => {
            return data.results[0].urls.full;
        });
    }
    const { data, error } = useSWR(link, fetcher);
    return { url: data, isLoading: !data && !error, error: error }
}

export default useFetchImages;