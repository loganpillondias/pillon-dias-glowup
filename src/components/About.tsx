import studioInterior from "@/assets/studio-interior.jpg";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <img
              src={studioInterior}
              alt="Interior da Maison Lumière by Rikelly Pillon"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="slide-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Sobre a Maison
            </h2>
            <p className="text-lg text-gray-text mb-4 leading-relaxed">
              Na <strong>Maison Lumière by Rikelly Pillon</strong>, cada traço é pensado para
              harmonizar e valorizar sua beleza única. Nossa missão é realçar a
              beleza natural de cada cliente com elegância, precisão e técnicas
              de ponta.
            </p>
            <p className="text-lg text-gray-text mb-4 leading-relaxed">
              Oferecemos um atendimento exclusivo em um ambiente aconchegante e
              sofisticado, onde você se sentirá acolhida e cuidada em cada
              detalhe. Nossa especialidade é a micropigmentação labial e o
              design de sobrancelhas de alto padrão.
            </p>
            <p className="text-lg text-gray-text leading-relaxed">
              Com anos de experiência e constante atualização nas técnicas mais
              modernas, garantimos resultados naturais e duradouros que realçam
              sua beleza de forma harmoniosa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
