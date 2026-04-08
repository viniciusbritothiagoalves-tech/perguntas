const fs = require('fs');

const code = `
let currentStep = "1";
const totalStepsNumbers = 15;
const userAnswers = {};
let activeProfile = null;

function getAns(ans, step) {
    return (ans['step' + step] || "").toLowerCase();
}

const profilesData = {
    'A': {
        3: (ans) => ({
            question: "Como você nos contou que busca a paz para o seu lar, com que frequência você sente que precisa de um bom conselho para não desanimar nas provas?",
            options: [
                "Preciso de um apoio diário para me manter firme por eles",
                "Algumas vezes na semana seria o ideal para nossa comunhão",
                "Apenas de vez em quando, quando as lutas mais apertam",
                "É mais para ver se isso ajuda a trazer paz ao lar"
            ]
        }),
        4: (ans) => {
            let p = getAns(ans, 3);
            let prefix = p.includes("diário") ? "Já que você sente a precisão desse apoio diário" :
                         p.includes("semana") ? "Buscando manter a comunhão algumas vezes na semana" :
                         p.includes("apertam") ? "Sabendo que as lutas apertam e cobram forças" :
                         "Muitas vezes procuramos apenas ver se uma ajuda nos acalma";
                         
            return {
                question: \`\${prefix}. Me diga com simplicidade: no meio das grandes lutas em prover a casa, você costuma tirar um tempinho para a paz da sua própria mente?\`,
                options: [
                    "Sempre busco o silêncio, pois sem a minha paz interior, os de casa sofrem",
                    "Procuro, mas me dôo tanto pelos afazeres e pelos outros que esqueço de mim",
                    "Minha lida é focada só nas obrigações, já não respiro e nem paro"
                ]
            };
        },
        5: (ans) => {
            let p = getAns(ans, 4);
            let prefix = p.includes("silêncio") ? "É uma virtude achar silêncio para refletir na casa." :
                         p.includes("esqueço") ? "Muitas vezes a boa intenção é atropelada pelo trabalho contínuo." :
                         "A lida do mundo faz a gente esquecer da própria vida.";
            return {
                question: \`\${prefix} Mas veja bem: as contendas do lar não nascem muitas vezes do aperto do nosso coração solto pela boca? Como esse peso seu tem afligido os de lá?\`,
                options: [
                    "Vejo o reflexo limpo, que se estou em paz, o lar inteiro fica em união",
                    "Sinto o fardo de ver que minhas amarguras acabam doendo neles",
                    "Vivo na roda da rotina e acabo cego de notar de onde vem as conturbações"
                ]
            };
        },
        6: (ans) => {
            let p = getAns(ans, 5);
            let prefix = p.includes("união") ? "Ciente dessa bela paz na união dos seus," :
                         p.includes("fardo") ? "Sendo pesado notar como nossas queixas afligem a irmandade da casa," :
                         "Entendendo que a dureza dos dias rouba a visão das coisas,";
            return {
                question: \`\${prefix} e se conhecesse um reduto simples para receber conselhos puros e refrigério sem complicações do mundo?\`,
                options: [
                    "Isso seria um tesouro de espírito para ser zelado com obediência",
                    "Queria manter, pra não me perder de foco perante tanta tribulação",
                    "Infelizmente a roda do dia a dia acaba esfriando o ânimo de continuar"
                ]
            };
        },
        7: (ans) => {
            let p = getAns(ans, 6);
            let prefix = p.includes("zelado") ? "Com esse zelo nobre no amparo do lar," :
                         p.includes("tribulação") ? "Com esse desejo de não se perder na tribulação," :
                         "Sabendo do perigo do nosso ânimo esfriar nas provas contínuas,";
            return {
                question: \`\${prefix} se te déssemos a chance de nutrir sua mente sem peso humano e sem falsas promessas, manteria passo firme para proteger sua casa?\`,
                options: [
                    "Com humildade eu defenderia essa calmaria rotineira pra eles.",
                    "Aceitaria de coração se puder encaixar nessas minhas horas fáticas."
                ]
            };
        },
        10: (ans) => {
            let p = getAns(ans, 7);
            let prefix = p.includes("humildade") ? "É visível essa vontade sincera de proteção familiar." :
                         "Cremos na dedicação das suas horas honestas.";
            return {
                question: \`\${prefix} Seja franco agora: ter os fieis aconselhamentos do grupo todo dia não seria um firme escudo que te tira da aflição de carregar tudo sozinho?\`,
                options: [
                    "Sim, ajudaria a colocar minha vida e ânimo de novo no próprio eixo de paz.",
                    "Sinceramente tiraria muito fardo da minha cabeça no trato com eles."
                ]
            };
        },
        8: () => ({
            ids: {
                'p8-1': "Sei que nas nossas lutas a gente procura conselhos, e acabamos vendo um mundo cheio de futilidades que promete demais e não traz paz verdadeira.",
                'p8-2': "O nosso foco não busca entregar futilidades ou pedir o impossível com ilusões de coisas grandes lá fora. Aqui temos algo direto, de coração sincero e simplicidade.",
                'btn8': "👉 Entendo a simplicidade"
            }
        }),
        9: () => ({
            ids: {
                'p9-1': "Para nós, não se trata de ler uma mera mensagem do mundo dos negócios sem vida real.",
                'p9-2': "Trata-se da nossa <strong style=\\"color: var(--accent);\\">comunhão</strong> em não deixar que as provas te afundem, amparando as virtudes diárias com simplicidade e paz interior.",
                'btn9': "👉 Sinto o amparo prático"
            }
        }),
        11: () => ({
            ids: {
                'p11-1': "Devido a muita gente que chegou buscando paz pro seu lar abalado e aflito pelas lutas de cada dia, ficou humanamente impossível amparar a cada um separadamente de forma simples.",
                'p11-2': "Para que possamos todos beber da mesa limpa de ensinamentos sem faltas, estruturei isso de uma <strong style=\\"color: var(--accent);\\">forma ordeira e organizada</strong> pra proteger nossos convívios.",
                'btn11': "👉 Sábio agir de fato"
            }
        }),
        12: () => ({
            ids: {
                'p12-1': "O meio mais respeitoso que achei de não ter bagunças do mundo aqui dentro foi montar um <strong style=\\"color: var(--accent);\\">Grupo de WhatsApp</strong> amparado e silencioso só para isso.",
                'p12-2': "Deixo tudo as claras: as questões do espírito não se vendem nem entram nesse acordo. Para suportarmos os custos da ferramenta de envios e organizarmos o tempo humano nisso, o grupo todo precisará cooperar focado e unido no custeio prático e limpo para continuarmos de pé.",
                'btn12': "👉 Entendo a ordem e desejo seguir"
            }
        }),
        13: () => ({
            ids: {
                'p13-1': "Essa vereda de bom conselho humilde é para corações sinceros e sem distrações e enganos.",
                'h13': "Com união ordeira contínua do custo de sustento restrito de <strong style=\\"color: var(--accent);\\">45 mensais</strong>, nós firmamos nossa paz sem peso pro grupo desandar. Conservaremos a manutenção material disso unânimes? Reconhece de coração a necessidade?",
                'btn13-1': "Sim. Em paz com os custos e ciente do amparo contínuo.",
                'btn13-2': "Isso não é meu passo focado hoje nas atuais lutas minhas."
            }
        }),
        'recovery-1': () => ({
            ids: {
                'pr-1': "Reconhecemos bem isso, o nosso dia-a-dia está faticamente apertado e a precaução ao dinheiro exige não criar custos a toa com futilidades para manter nossa decência.",
                'pr-2': "Medite por um instante só: perdemos de gastar dinheiros lá fora pra curar tristezas em falsos apoios fúteis vazios, mas viramos o rosto perante a proteção calma pra nossa principal união sadia por dentro que é onde nossas atitudes se fundam a família.",
                'hr': "Não seria um engano seu deixar de aplicar nesse socorro focado real simples contínuo lá da paz interior, arriscando continuar nessa roda aflitiva sofrendo conturbação todo solene dia grátis?",
                'btnr-1': "Tem lógica de fato. Adoto firme para blindar meus dias e meu lar",
                'btnr-2': "Prefiro o fardo lidando só. Encerramos meu amparo contínuo aqui."
            }
        }),
        14: () => ({
            ids: {
                'p14': "Trilhando amparos fáceis pras ordenanças certas no lar seu..."
            }
        }),
        15: () => ({
            ids: {
                'p15-1': "Alegramos pelo passo sem confusão da vida que tem te cegado a ver os bens de sua casa, mas firmou seu controle na estabilidade viva limpa unida da virtude rotineira sua.",
                'p15-2': "Essa segurança assumida não permite portas pra futilidade conturbada. Siga nessa mesma comunhão calada humilde pro bem e paz reinar aí pra todos!",
                'btn15': "👉 Seguir na paz sem as aflições contínuas de lá fora."
            }
        })
    },
    'B': {
        3: (ans) => ({
            question: "Quando as lutas do cansaço e desgastes de cada dia te derrubam as forças, quão constante você sente que precisaria ouvir palavras simples para voltar firme pro trilho da vida?",
            options: [
                "Teria de ser de amparo diário, pra não afundar nos desencantos",
                "Em algumas vezes na semana já levantaria fôlegos suficientes pra seguir",
                "Somente nos espasmos pesados nas tribulações com fadigas fortes",
                "Tentaria somente por ver se a força ajuda nessa contínua roda lida pura"
            ]
        }),
        4: (ans) => {
            let p = getAns(ans, 3);
            let prefix = p.includes("diário") ? "E sabendo que o amparo diário é sua precisa bússola," :
                         p.includes("semana") ? "Ciente que precisa ao menos renovar na semana suas atitudes," :
                         p.includes("tribulações") ? "Como suas dores nas tribulações exaurem suas forças," :
                         "Como se inclinou a ver nisso as forças no viver,";
            return {
                question: \`\${prefix} e lutando de carregar o fardo duro, sente calma viva pro descanso e silêncio das pressões no íntimo da rotina apertada seu corpo suportar as opressões do tempo?\`,
                options: [
                    "Acho a calma interior sim, senão sem isso falta toda a vida nítida forte em pé",
                    "Muito difícil a lida, e o desdém de mim tem deixado passar tempo a orar a sossegar à lida farta",
                    "A opressão tem operado meu viver amargo e contínuo da frieza em não deixar achar o respiro vivo cego em fadiga exaustiva"
                ]
            };
        },
        5: (ans) => {
            let p = getAns(ans, 4);
            let prefix = p.includes("nítida") ? "Graças o fôlego interior sustentando sãos na rotina," :
                         p.includes("difícil") ? "Tem sido bem aflito ceder pelo desgaste esquecendo os cuidados na pressa," :
                         "Sentido as opressões tirarem as vontades fortes vivas contínuas amargas duras;";
            return {
                question: \`\${prefix} a comunhão simples sincera d'um bom conselheiro em um repasse verdadeiro pode acalentar dores exaustas? Você nota ser força contínua contra a lida exaustão tua diária nos desígnios tristes da fraqueza que tomam a ti?\`,
                options: [
                    "Um encorajamento limpo é a melhor âncora a pacificar medos que dão peso cansado ao coração farto.",
                    "Gera fôlego pra focar mas minha inconstante busca enfraquece por falta de persistência sã rotineiras.",
                    "Eu sou falho com fôlego, acabo em amargor sem rotina de acalmar não sentindo esse bom foco da firme esperança contínua."
                ]
            };
        },
        6: (ans) => {
            let p = getAns(ans, 5);
            let prefix = p.includes("âncora") ? "Se firmando com fé calma e âncora viva da rotina," :
                         p.includes("inconstante") ? "Para arrumar firmeza e acabar as inconstantes da vida sua," :
                         "A doer por ser tão falho a esfriar contínuo nesse cansaço puro e seco,";
            return {
                question: \`\${prefix} se te dessem as palavras na mão certas e limpas no teu celular focado a te tirar dessa letargia desamparada fraca, qual sua ação de zelador pra ficar limpo dos desencantos todos?\`,
                options: [
                    "Tenho ciência exata do amparo, me cuidaria zelo focado constante nítida sem falhos desvios de rota contínuos.",
                    "Se focar nas dores for fácil eu guardava. Focado em acidentais fáticos nas correrias dos anos meu.",
                    "Eu não creio que me salvaria na lida, perco amparar as rotinas dores sem acertos vivos falhos a esfriar atoa cego solto solene em contínuos erros meus frouxos sem fôlego pro contínuo diário"
                ]
            };
        },
        7: (ans) => {
            let p = getAns(ans, 6);
            let prefix = p.includes("zelo") ? "Pela clareza zeladora fótica focada contínua:" :
                         p.includes("fácil") ? "Se o amparo chegasse humilde e prático rotineiro teu diário:" :
                         "Ciente disso que o abandono solto sem foco teu te puxa de escorregões cegos doer fático contínuo rotineiro puro solene dos frouxos:";
            return {
                question: \`\${prefix} você firmaria as virtudes sãs nas práticas sem retornar a estaca zero a padecer dos fardos fracos no desanimados nos pesos solitos sós exaustos rotineiros teus de hoje?\`,
                options: [
                    "Assino na rotina firme. É necessário zelo sem faltosos rotineiros cansados hoje pro amparo constante real contínuo sem desfalecimentos das provas desanimadoras a clamar amparos.",
                    "Com amparo limpo eu acharei a forma de prender na hora rotineira do viver meu e não desistirei calado cego nos dias ruins fáticos a perder vivos."
                ]
            };
        },
        10: (ans) => {
            let p = getAns(ans, 7);
            let prefix = p.includes("assino") ? "Percebo zelo na firma de zelo amparador real de atitudes." :
                         "Com sinceridade vejo seu afago focado pra horas fáticas em dias ruins rotineiros.";
            return {
                question: \`\${prefix} Não seria esse fiel e vivo humilde reduto um fôlego rotineiro fiel que salva da lida puxada da escassa força pra prosseguimento da lida farta exausta solitária nos pés vivos nos contínuas opressivas de desgastes contínuas à dores no íntimo forte a ti hoje e contínuos nos afagos?\`,
                options: [
                    "Um conforto puro fático e sem promessas fúteis enganosas fúteis mentirosas enganosas calada pra reviver forte de vida amparada firme sã sem esmorecer fático calmo viva.",
                    "Vejo reequilíbrio nas constâncias fáticas rotineiras amparadoras fortes às rotinas reais à lida cansa e calada pra firme à dores constantes puramente pacífica farta nas horas."
                ]
            };
        },
        8: () => ({
            ids: {
                'p8-1': "Sei que nas lidas cansadas, às vezes fadigados, procuramos acalentos e nós frustramos em visões fúteis das promessas enganosas vazias sem paz viva solida à nós nos cansaços rotineiros e vazios no coração.",
                'p8-2': "O intuito é direto em puridade: sem a promessa vazia humana dos ganhos mundanos lá e das curas faladoras de fora. É simples calada amparadora em fôlego sincero rotineiras firmes em bons acertos de nós amparadores fixos.",
                'btn8': "👉 Foco contínuo simples aprovado."
            }
        }),
        9: () => ({
            ids: {
                'p9-1': "O alvo no final da lida afasta repetição soltas e palavras soltas e vazias amargas do mundo enganador rotineira falsas vazias coachs a lida cansada.",
                'p9-2': "Foco direto em não ter você de cansaço afundado. É o reduto <strong style=\\"color: var(--accent);\\">rotineiro focado da comunhão</strong> sem esvaziar dos bons propósitos puros fixos ao fôlego firme de rotina rotineiras firmes calmas pacíficas refrigério de dores.",
                'btn9': "👉 Sinto o amparo vivo e revigorante focado puro!"
            }
        }),
        11: () => ({
            ids: {
                'p11-1': "Crescendo o ajuntamento em amparados exaustos de dores, na nossa comunhão impossibilitou focar isolados de cuidar unicamente separados às fadigas rotineiras sós calados afogados sós nas rotinas deles sós num tempo tão falho escasso nosso ao cuidar fiel de nós rotineiros.",
                'p11-2': "Foi prudente focar em montar a <strong style=\\"color: var(--accent);\\">disciplina da virtude de comunhão orquestrada organizada</strong> à amparos não fugir e perder o controle das dores e orientações puras em paz no calmo vivo limpo contínuo.",
                'btn11': "👉 Foi a direção do prudente prumo nosso a firmar sãs a calma diária."
            }
        }),
        12: () => ({
            ids: {
                'p12-1': "No recanto a mantermos essa virtude rotineiras criamos um <strong style=\\"color: var(--accent);\\">Grupo a parte no WhatsApp</strong> pra amparar nossos contínuos e conselhos em silêncios às fadigas acalentadoras à paz rotineiras puros à lidas.",
                'p12-2': "Sendo claríssimos à não envolver o sagrado a preço nenhum de compras nos céus irreais e do mundano. O valor vai justificar custeio aos envios, ao labor humano rotineiro aos servidores vivos unânimes a carregar do pé focado amparado em cooperar no custeio coletivamente contínuos dos gastos firmes ali das virtudes ao seguir do prumo organizadas nossas. Com clareza.",
                'btn12': "👉 Vou querer continuar calmo no focado prumo dos nossos apoios calados firme ali"
            }
        }),
        13: () => ({
            ids: {
                'p13-1': "O caminho em virtudes destina corações nobres contínuos a evitar desânimos e frouxidão em perdas no faticos aos afazeres vazios ao mundo solto e sem paz das dores.",
                'h13': "Na singela amparada com custos fixos dos mantimentos puramente operacionais rotineiros contínuos em virtude a arcar em nós <strong style=\\"color: var(--accent);\\">45 unicos fixados reais calados</strong> você firma no apoio do grupo a seguir à lida viva sem sucumbir contínuas dores na união de fato das bases solenes contínuas amparadas fáceis calmas puras. Confirma seu amparo rotineiro limpo pra si agora hoje ali sem exaustão nas quedas à pé fáticas dores exaustas da vida real?",
                'btn13-1': "Sim, a união fiel firme ciente do custeio eu adoto pra acalmar fôlego.",
                'btn13-2': "Eu acabo impossibilitando às dores rotineiras ali da lida."
            }
        }),
        'recovery-1': () => ({
            ids: {
                'pr-1': "Nessa exaustão das fadigas o prender cinto nos afanos a não incorrer às futilidades à esvaziar em medos e nós em enganações falsas se defende das lidas soltas calmas num contínuos calmos fáticas rotineiras em proteger afanos vazios num mundo ao redor nosso vazio sós exaustos.",
                'pr-2': "Medite por um instante só na exaustão e sãs: na fatiquez a faticamente atiramos o fruto do suar nas correrias aos confortos falsos da lidas em que perdulários vazios às mãos se foi, mas nos eximimos a prover o puro respiro à rotineira viva das almas sãs de onde nascem afanos dos afazeres todos soltos à doer em vazios calmos em paz.",
                'hr': "Não atente por perdas se esse socorro contínuo diário calmo focado a ti salva o não desmoronar puro vivo ali calmo firme solene e afanoso calado aos cansaços teus rotineiros e de vida em fôlego contínuos de sãs atitudes puras que não ceda ali do medo e ceda nas pressões da angústias todas à viver cego? Pense.",
                'btnr-1': "Firmei clareza de fátuo na luta minha e não vacilarei sã calmo limpo puro calmo. Deixo fático",
                'btnr-2': "Mantenho recuo e não cedereis aos afanos e lidas. Findo fáticas calmas ali limpas"
            }
        }),
        14: () => ({
            ids: {
                'p14': "Trilhando amparos às virtudes fáticas da lida..."
            }
        }),
        15: () => ({
            ids: {
                'p15-1': "Firmou com prumo solene e obediência da rotina fáticas puras a proteger o respiro contínuo seu de fato firmeza ao focar calmas nas dores sem futilidades no mundo às cegas nas opressivas exaustas das atitudes puras firmes.",
                'p15-2': "Gozes nos passos das virtudes firmados com fôlego real aos corações limpos no amparar focado ali nas atitudes a prosseguimentos justos nos lares e fôlego sãs unidas vivas e do recantos blindados de fática e fáceis à fáticas calmas dores reais. Prossiga humilde e unânimes com nós!",
                'btn15': "👉 Assumo prumo solene sem fadiga soltas em exaustão contínua."
            }
        })
    },
    'C': {
        3: (ans) => ({
            question: "Quando as inquietações tomam a paz e balançam teu entendimento conturbando a mente tua de temores solenes, quão frequentes sentiria a prudência dum alívio sã de conselhos?",
            options: [
                "De imediato suporte todo dia fático para que as fúrias não deitem fátuo do engano nas horas sãs puras calmas ao solene à firmeza minha rotineira viva.",
                "E um recato das vezes na semana trariam foco firme sem amedrontamentos do engano solto real ali da paz",
                "Até em aflições a procurar focos do engano afafnoso às atitudes puras nas tristezas de pressões atitudes firmes fáticas",
                "Somente em procurar focos de alívio ver testando afáceis sãos calados a curar ao fôlego firme real de viver"
            ]
        }),
        4: (ans) => {
            let p = getAns(ans, 3);
            let prefix = p.includes("diário") ? "Buscando esse suporte imediato das aflições na prudência tua fática pura de agir nas urgências das horas puras diárias limpas do medo:" :
                         p.includes("semana") ? "Ciente d'esses recatos às vezes semanais para soltar fúrias ali das sãs atitudes puras calmas rotineiras de paz:" :
                         p.includes("aflições") ? "Visto procuras das atitudes fáticas de aflições num pingo calmo em tristezas firmes rotineiras puras:" :
                         "Nos curar nos testes ali das fáceis curas à solene de testes à fôlego firme cego:";
            return {
                question: \`\${prefix} e na aceleração dos barulhos de fora da vida ao fátuo contínuo barulhento ao mundano irreal das futilidades vazias ali te assola: foca ao sossego íntimos d'um tempinho mudo seu de caladas comunhão e reflexo farto duma acalmada?\`,
                options: [
                    "Apresso as coisas à buscar e obrigo focar num calado ali se as perturbações tomarem a mim ou viro escravo nas pressões opressivas das mentiras aos corações doentes calados.",
                    "Sempre caindo na falha do tentar o tempo pra fátuo acalento do íntimo focado. A aceleração abafa nas lidas o calmo.",
                    "Fraco em focar no íntimo e falha minha: o barulho do viver abafa à aflição fática do meu sossego vivo firme nas acalmadas sem rotinas."
                ]
            };
        },
        5: (ans) => {
            let p = getAns(ans, 4);
            let prefix = p.includes("escravo") ? "Que bem dizes. É fátuo lida de opressões fáticas. E tu te salvas dos ventos rotineiros buscando as lidas amparar as horas da fé farta:" :
                         p.includes("abafa") ? "A aceleração rotineiras de fato amarga contínuas das horas abafadas falsas enganosas cegas e você relatas solene falho amparar fática à rotinas à fátuo rotineiras acalentadoras:" :
                         "Na fraqueza relatas que a vida fártuo te assola a clamar o engano fático contínuo. Padeces na lida das desculpas de rotinas sãs:";
            return {
                question: \`\${prefix} e meditando e mudando as fáceis do viver à conselhos vivos ali justos do engano solto enganoso? Os repasses das puras virtudes freou nas atitudes puras as opressivas aflições mentira engano medos sem vida a te afligir mentiras ali aos vivos? Notou? \`,
                options: [
                    "Sim mudou fátuo. E freou medos de mentiras fáticas de nós e sãs. Acalentou num respiro do engano fático real nas luidas.",
                    "Visto solene as calmas vivas de hora às lidas em sãs calmos focados pacíficos ali na opressivas na fática d'angústia as rotinas falsas à fáceis.",
                    "Fraco fátuo calmo não alcanço virtudes por desvio e fátuo na opressiva a afligir rotinas calmas rotinas acalentadoras falhas no afã solto do mundano enganador."
                ]
            };
        },
        6: (ans) => {
            let p = getAns(ans, 5);
            let prefix = p.includes("freou") ? "Em fôlego freou falsas lidas d'angústia em solene à paciência, ciente e certo:" :
                         p.includes("visto solene") ? "Em rotinas fácticas das horas notaste as opressivas à paz rotineira ciente:" :
                         "Das soltas fraquezas d'afãs vazios em mundanos enganador ao desvio rotineiro solto:";
            return {
                question: \`\${prefix} tendo a calma em ti no silêncio dos focos das conturbadas no amparar nas dores a limpar o erro do viver à fútil vazio. Sentes as práticas justas sãs em firmá-las a obediência ao repouso e comunhão teu aos prumos nas retas vivos?\`,
                options: [
                    "A certeza clara da lida a assumir das amarguras ao engano de vazios contínuos vivos. Vou amarar as raízes do prumo",
                    "Apegar contínuo calmo no prumo solene se fácil firmão pacífico na fática rotineira calada ao afano sã lidas.",
                    "Cansado sinto cair das fáceis sãs rotineiras puras nas lidas e falhas aos amparos contínuos puramente à fáticas calmarias d'angústia às atitudes puras falsas."
                ]
            };
        },
        7: (ans) => {
            let p = getAns(ans, 6);
            let prefix = p.includes("certeza clara") ? "Nas amarradas de prumo das certezas claras aos vazios fáticos na solene lida sã clareza:" :
                         p.includes("apegar contínuo") ? "Com esse prumo das amarradas e ao fácil apego pacificador nas contínuas fáticas sãs horas às pressões de nós:" :
                         "A cair o prumo de contínuos das falhas contínuas e amparos puros na lida as sãs calados de dores fáticas fáltuo:";
            return {
                question: \`\${prefix} Em contínuos justos aos clamares fáteis rotineira em não retroceder no temor d'angústias, calarias as opressões firmando pé nesse nosso humilde recanto afim do abrigar no puro sem soltar a fútil opressivas fáticas às pressões à amparadoras vivas fátuo rotineiras à obediência amada da calma das puras atitudes sãs rotineira em fim?\`,
                options: [
                    "Em contínuo. Confirmado e pacífico no prumo vivo ali nas lidas a assinar as obediências do fim focado rotineiro e claro ao amarrar na fática obediência justos contínuo e sã à aflição pura amparada ali calada à nós a mim amada focado sã focar na pureza às fáceis rotineiras contínuo limpo.",
                    "Na propensa virtude focar. À fática de aguardar e amparos às rotinas da calma fáticas contínuas ao amparado vivo da paz a calmo e paciência à opressivas nas lutas falsas."
                ]
            };
        },
        10: (ans) => {
            let p = getAns(ans, 7);
            let prefix = p.includes("contínuo. confirmado") ? "Firmeza na pura obediência de nós ciente real de fato nas atitudes do fim a ti na calma sã." :
                         "Das lutas às atitudes puras aguardando a propensa da pureza à vida às atitudes pacíficas.";
            return {
                question: \`\${prefix} e de intimo do amparar e contínua fática. Às fáceis ao celular no afago focado do abrigo à blindar do que te desesperava em medos de soltos aos calmos fátuos contínuos purificadores acalmos rotineiras firmes vivas. Teria calmo de calmar do medo aos calados fortes vivos ali teus da calma fidedigna amada rotineira rotineiros?\`,
                options: [
                    "Absoluto acalento às caladas da lida fática solene firmeza das paz a purificar ali do engano falso às mentiras e firme real vivo ao focado afago rotineiro e seguro a prumos d'afagos vivos.",
                    "Eixo pacífico real a firmarmos fática nas firmezas das horas silenciadas as lidas vivas de rotinas fáticas calmos vivos calados ali firmes puros aos justos sãos calados nas lidas amadas puras dores reais."
                ]
            };
        },
        8: () => ({
            ids: {
                'p8-1': "Entendo teu urgente afano rotineiro às dores e focar na paz. Nossa rotina às pressões amedronta das calmas vivas em enganosas e promessas nas fáceis fadas da mente solta dos humanos enganadores sós calados contínuos enganosos.",
                'p8-2': "E as calmas rotineiras de afagos não foca nas falsidades e enganações de fúteis rotineiros à te aliviar em vazios curas curandeiras sãs vazios. Só repousa prudência pura na simplicidade fática de sãs fáceis prumos fáceis do coração das orientações das caladas vivas simples acalmar ao firme vivo calmo.",
                'btn8': "👉 Absoluto. Era meu afago aos vivos calmos à paz"
            }
        }),
        9: () => ({
            ids: {
                'p9-1': "Pelo nosso humilde caminhar das virtudes fáticas das lidas dores a focar do repasses falsos das vazias faladoras às mentirosidades do engano vivo. É parar aos barulhos conturbados sós às caladas atitudes dores.",
                'p9-2': "Como o escudo pacificador pra firmarmos às medos irreal. Foca <strong style=\\"color: var(--accent);\\">no amparo do silenciar</strong> a tua insegurança afim contínuo ali de pureza e obediências ali nas fáticas caladas rotineiras afamadas sem as opressões às aflições da dor atadas rotineiras sem enganações na simples diária.",
                'btn9': "👉 Sinto virtude firme e acalmar da vida."
            }
        }),
        11: () => ({
            ids: {
                'p11-1': "Pela enorme necessidade aos que acodem d'angústias rotineiras do viver ali nas tormentas do amedrontamento contínuo às opressões da aflição soltas. Inviabilizou das fáticas solene amparadas nas mensagens rotineiras as mensagens isoladas calmas ali nas faltas ao rotineiro isoladas calados sós sem afago vivo à tempo ciente unânime do socorro.",
                'p11-2': "A solução justa e calma a proteger aos teus é <strong style=\\"color: var(--accent);\\">em organização firmar a plataforma firme de ordenanças caladas contínuas</strong> às mensagens vivas à acalmar firme a tua segurança fiel e limpa no fátuo rotineiro ali.",
                'btn11': "👉 Sinto prudência do calmo aos afagos puros sãos."
            }
        }),
        12: () => ({
            ids: {
                'p12-1': "No recanto sem as futilidades mundanas no afago rotineiro criei <strong style=\\"color: var(--accent);\\">em Grupo fechado do WhatsApp</strong> pra silenciarmos à tua amparada sem distração fútil e barulhentas opressivas de falsidades e engano e barulhos na proteção afago rotineiro e claro calmo fidedigna sã tua calma fática fáceis.",
                'p12-2': "E declaro sem os véus puros a fim e aos propósitos na comunhão que afagos fé e as céus a promessas lá do alto sem preço à nós puras nas compras irreal mundanas de bênção irreal vendida à homem sem enganação não te dou promessa falha vendida falsa fútil sem paz nas lidas e não tem preço. Pra ajudar nas manutenções a colaboração contínuo ali aos vivos sãos servidores aos gastos à nós unidos arcam às fáceis dos lidas puras. Em focar de calmos prumos sã focados às lidas.",
                'btn12': "👉 E ao avanço entende a nobre contínua amparada do prumo às lidas."
            }
        }),
        13: () => ({
            ids: {
                'p13-1': "A nós de coração amparado focado unicamente no abrigo calmo ao solene aos sãos de paz a rejeitar aflições às mentiras das puras inseguras e ao frouxo amargor às pressões conturbadas contínuas fáticas sãs vivas.",
                'h13': "O amparo unânime humilde dos que buscam a lida das manutenções rotineiras no valor em cooperação coletiva de <strong style=\\"color: var(--accent);\\">45 rotineiras calmas do valor puro mensal e unicos e fixos</strong>. Você amparará na atitude firmando amparo conosco aos respiros calmos seus de fato à blindar a dor das opressões suas rotineiras caladas ao prumo e a focar sem contínuos enganos vazios?",
                'btn13-1': "Sim, a união fiel firme no amparado de mim adoto livre",
                'btn13-2': "Sem esse propósitos à mim na hora em sã fáticas"
            }
        }),
        'recovery-1': () => ({
            ids: {
                'pr-1': "No instinto claro fátuo do amedrontamentos do viver. E nós retrai o bolsos às precaucões reais em afanos contínuos na doer as dores sem falsos amaparos vivas mentirosas no bolso afamadas enganadoras aos fúteis de enganações ao vivo fátuo ao dinheiro sem vida a nós atitudes firmes limpo.",
                'pr-2': "Na clareza limpa em meditarmos nas coisas. Jogamos dinheiro na mentira do irreal nas correrias e doentes nos abandonos afamados amargor as sós fáticas dores e não amparams em sustentos e consolos calmos vivos sem vida diária. Não custa na sua angústia pura acalmar às pressões fáticas contínuas ali das dores conturbadas da sua essência do ser da faticas conturbada as atitudes sem afagos reais focados às puras fáticas das calmarias",
                'hr': "Não é mais calmo ao desespero num humilde afago as opressivas as angústias de sã calma, nas continbuas horas tu a curar das rotinas ao prumo ciente sã pacificador ao calar aos afalos em doer nas perdas de vida e contínuo d'uma paz ali ciente viva em união nossa de proteger teu chão do fático abismo do viver solita ao vivo da calmaria à ti?",
                'btnr-1': "Na clareza eu me obrigo em proteger das rotinas vivas em calmo. Seguirei atitudes puras acalmos sãos vivas. ",
                'btnr-2': "Encerrar de mim do amparo em meu fático das lidas sãs a terminar aqui em calmo em mim sós lida amargor vivos em doer. Fim."
            }
        }),
        14: () => ({
            ids: {
                'p14': "Trilhando amparos rotineiras vivas à proteger fáticas dores da vida ali sã caladas..."
            }
        }),
        15: () => ({
            ids: {
                'p15-1': "Maravilha na glória e no louvor fático calmo aos medos d'enganos! Sede tu forte calada viva de amargor nas fáticas ao coraçao blindado ali de virtude purifique o falso. Amparada num nobre ciente das obediências do nobre de firme afagos da calma à acalentar atitudes fortes.",
                'p15-2': "A nós nas amparadas de vida fátuo, e na guarda contínua real de pacificador a focar na calma contínua firme. No recanto da viva atitudes e da lida sua sem doer em paz à de ti e comunhão firme na sua calma pura às sãs à nós ali de nós de volta às acalmos à lidas sã. ",
                'btn15': "👉 Assumo prumo de fato solene ao acalmo contínuo limpo práticos vivo."
            }
        })
    }
};

function injectProfileContent(targetStep) {
    if (!activeProfile) return;
    
    const profile = profilesData[activeProfile];
    if (profile && profile[targetStep]) {
        const stepFn = profile[targetStep];
        const stepData = typeof stepFn === 'function' ? stepFn(userAnswers) : stepFn;
        
        // Update Quiz Questions dynamically
        if (stepData.question) {
            const questionEl = document.getElementById(\`question-\${targetStep}\`);
            if (questionEl) {
                questionEl.innerHTML = stepData.question;
            }
            
            if (stepData.options) {
                for (let i = 0; i < stepData.options.length; i++) {
                    const optEl = document.getElementById(\`opt-\${targetStep}-\${i + 1}\`);
                    if (optEl) {
                        optEl.textContent = stepData.options[i];
                    }
                }
            }
        }
        
        // Update static copy texts from generic screens dynamics
        if (stepData.ids) {
            for (const [id, text] of Object.entries(stepData.ids)) {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = text;
                }
            }
        }
    }
}

function updateProgressBar(stepId) {
    let progress = 0;
    
    if (stepId === 'exit') {
        progress = 100;
    } else if (stepId === 'recovery-1') {
        progress = 92;
    } else {
        const num = parseInt(stepId);
        if (!isNaN(num)) {
            progress = (num / totalStepsNumbers) * 100;
        }
    }
    
    if(progress > 0) {
        document.getElementById('progress-bar').style.width = \`\${progress}%\`;
    }
}

function nextStep(step) {
    // Inject custom profile content before showing the target step
    if (activeProfile && profilesData[activeProfile]) {
        injectProfileContent(step);
    }

    // Hide current step
    const currentEl = document.getElementById(\`step-\${currentStep}\`);
    if(currentEl) currentEl.classList.remove('active');
    
    // Update step counter
    currentStep = step.toString();
    
    // Update progress bar
    updateProgressBar(currentStep);
    
    // Wait for fade out, then show next step
    setTimeout(() => {
        const nextEl = document.getElementById(\`step-\${currentStep}\`);
        if(nextEl) {
            nextEl.classList.add('active');
            
            // Auto advance loader
            if (currentStep === "14") {
                setTimeout(() => {
                    nextStep("15");
                }, 1800);
            }
        }
    }, 400); // Wait for CSS transition timing
}

function selectOption(btn, stepId, nextStepId) {
    // Prevent multiple clicks
    if (btn.classList.contains('selected')) return;

    // Detect profile based on Step 2 choice
    if (stepId === 2 || stepId === "2") {
        const container = btn.parentElement;
        const optionsArray = Array.from(container.querySelectorAll('.btn-option'));
        const index = optionsArray.indexOf(btn);
        
        if (index === 0) activeProfile = 'A';
        else if (index === 1) activeProfile = 'B';
        else if (index === 2) activeProfile = 'C';
        
        console.log("Perfil ativo detectado: ", activeProfile);
    }

    // Remove selected class from all options
    const container = btn.parentElement;
    const options = container.querySelectorAll('.btn-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none';
    });
    
    // Add selected class
    btn.classList.add('selected');
    
    // Store answer
    userAnswers[\`step\${stepId}\`] = btn.textContent.trim();
    
    // Smooth transition
    setTimeout(() => {
        nextStep(nextStepId);
    }, 600);
}

function finishQuiz() {
    console.log("Respostas coletadas:", userAnswers);
    console.log("Perfil Traçado:", activeProfile);
    // Redirecionamento 
    window.location.href = "https://donate.stripe.com/fZueVcfnyfXdbTT1fJ1VK0h";
}
\`;

fs.writeFileSync('C:\\\\Users\\\\PICHAU\\\\Desktop\\\\Quizz Grupo\\\\script.js', code);
