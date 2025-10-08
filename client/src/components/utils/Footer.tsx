const Footer = () => {
  return (
    <footer className="text-center py-4 text-sm text-gray-400 border-t border-gray-700 mt-8">
      <p>
        © {new Date().getFullYear()} Relo.AI.App — built by Erica Collier ·{" "}
        <a
          href="https://github.com/Ecce0/AIRelocationApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:underline"
        >
          View Source
        </a>
      </p>
    </footer>
  );
}

export default Footer