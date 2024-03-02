export default function cursor(emoji: string) {
    return {
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>${emoji}</text></svg>") 16 0, auto`
    };
}
