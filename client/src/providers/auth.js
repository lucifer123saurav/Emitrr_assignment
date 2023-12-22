export const auth = () => {
    const who = localStorage.getItem("who");  // fetching the jwt auth token
    if (!who)
        return false;
    const token = JSON.parse(who);
    let data = {};
    data.token = token;
    const headers = {
        'Authorization': `Bearer ${data.token}`,
        'Content-Type': 'application/json'
    };
    return { headers, data }
}