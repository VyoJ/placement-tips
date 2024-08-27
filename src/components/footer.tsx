function Footer() {
    return (
        <footer className="h-14 bg-ring text-secondary text-sm md:text-base lg:text-base py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Student Placement Helper. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;