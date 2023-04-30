import CustomLink from '../components/CustomLink/CustomLink';

export default function Header() {
    return (
        <div className="header">
            <h1><CustomLink to="/" name={"Home"}/></h1>
        </div>
    )
}