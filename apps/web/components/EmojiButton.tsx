import { ButtonProps } from './ui/button';

interface EmojiButtonProps extends ButtonProps {
    isActive?: boolean;
    emoji: string;
}

export default function EmojiButton({ emoji, isActive, onClick, ...props }: EmojiButtonProps) {
    const activeClass = isActive ? 'bg-primary' : 'bg-slate-200';
    const hoverClass = 'hover:bg-teal-300';
    const pressClass = 'active:animate-bounce';

    return (
        <button
            {...props}
            onClick={onClick}
            className={`text-6xl p-5 rounded-2xl transition-all ${activeClass} ${hoverClass} ${pressClass}`}
        >
            {emoji}
        </button>
    );
}
