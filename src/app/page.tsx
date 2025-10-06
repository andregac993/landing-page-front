
import { Sparkles, Zap, Shield, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import {LeadForm} from "@/components/LeadForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/10">
            <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                L0gik
                            </h1>
                        </div>
                        <nav className="flex items-center gap-6">
                            <a
                                href="#beneficios"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
                            >
                                Benefícios
                            </a>
                            <a
                                href="#form"
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/25"
                            >
                                Começar
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="py-16 md:py-28 lg:py-36">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4" />
                            <span>Novidade: Transforme seu negócio hoje</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in-up">
                            Transforme seu negócio com{" "}
                            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                soluções inovadoras
              </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed text-pretty animate-fade-in-up animation-delay-200">
                            Descubra como podemos ajudar sua empresa a crescer e alcançar novos patamares de sucesso com tecnologia de
                            ponta
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
                            <a
                                href="#form"
                                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all hover:scale-105 shadow-xl shadow-primary/30 w-full sm:w-auto justify-center"
                            >
                                Fale com a gente
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#beneficios"
                                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-foreground bg-card hover:bg-muted rounded-full transition-all border-2 border-border hover:border-primary/50 w-full sm:w-auto justify-center"
                            >
                                Saiba mais
                            </a>
                        </div>

                        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in animation-delay-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>Sem compromisso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>Resposta em 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>100% seguro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="beneficios" className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                            Por que escolher nossa solução?
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Oferecemos as melhores ferramentas para impulsionar seu crescimento
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                        <div className="group bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                                <Zap className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <h4 className="text-2xl font-bold text-foreground mb-3">Resultados Rápidos</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Implementação ágil com resultados visíveis em curto prazo. Veja seu negócio crescer rapidamente.
                            </p>
                        </div>

                        <div className="group bg-card hover:bg-gradient-to-br hover:from-secondary/5 hover:to-secondary/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/50 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/25">
                                <Shield className="w-7 h-7 text-secondary-foreground" />
                            </div>
                            <h4 className="text-2xl font-bold text-foreground mb-3">Segurança Total</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Proteção de dados e conformidade com as melhores práticas de segurança do mercado.
                            </p>
                        </div>

                        <div className="group bg-card hover:bg-gradient-to-br hover:from-accent/5 hover:to-accent/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-accent/50 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
                            <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-accent/25">
                                <Users className="w-7 h-7 text-accent-foreground" />
                            </div>
                            <h4 className="text-2xl font-bold text-foreground mb-3">Suporte Dedicado</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Equipe especializada pronta para ajudar quando você precisar, 24 horas por dia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="form" className="py-20 md:py-32 bg-gradient-to-br from-muted/30 to-accent/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>Vamos conversar</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                                Entre em contato
                            </h3>
                            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                                Preencha o formulário abaixo e nossa equipe entrará em contato com você em até 24 horas
                            </p>
                        </div>

                        <div className="bg-card p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl border border-border">
                            <LeadForm />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold text-foreground">L0gik</span>
                        </div>
                        <div className="text-center md:text-right text-muted-foreground text-sm">
                            <p>&copy; {new Date().getFullYear()} Sua Marca. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
