import headerImg from '../assets/images/quiz-logo.png';
export default function Header(){
    return(
        <header
            className="my-8 text-center"
        >
            <img className="size-12 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)] inline" src={headerImg} alt="Quiz Logo" />
            <h1
                className="m-0 font-['Roboto_Condensed',sans-serif] font-bold text-[2.5rem] tracking-[0.6rem] uppercase bg-linear-90 from-[#e781fb]_40% to-[#8e76fa]_60% bg-clip-text"
            >React Quiz</h1>
        </header>
    );
}