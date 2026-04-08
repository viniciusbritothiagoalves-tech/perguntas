# Reestruturação Completa: Cultura CCB e Memória Dinâmica de Respostas

Para atender às duas grandes necessidades apontadas (adaptação ao público da Congregação Cristã no Brasil e a personalização profunda etapa por etapa), tracei uma nova inteligência para o sistema.

## 1. O Motor Dinâmico de "Memória de Resposta"
O seu feedback foi perfeito: é frustrante clicar em opções diferentes e cair numa tela com o mesmo texto fixo.
A solução ideal e mais avançada que vou implementar: em vez de apenas o "Perfil A, B ou C" decidir a tela, **as perguntas vão puxar a resposta anterior do usuário na mesma hora**.

*   **Exemplo Prático (Se ele escolher a opção 1 na Etapa 3):**
    *   *Opção escolhida:* "Preciso de um apoio diário para me manter forte por eles."
    *   *Como a Etapa 4 vai aparecer:* "Já que você precisa de um **apoio diário para se manter forte**, me diga: no meio das provas e lutas da rotina, você costuma tirar um tempinho para a paz da sua mente?"
*   **Exemplo Prático (Se ele escolher a opção 2 na Etapa 3):**
    *   *Opção escolhida:* "Algumas vezes na semana seria o ideal para não perder o eixo."
    *   *Como a Etapa 4 vai aparecer:* "Entendi que ter esse apoio **algumas vezes na semana seria o ideal** para não perder seu sentimento. Pensando nessa rotina apertada, você tem conseguido tirar um tempinho para a sua paz mental?"

Isso fará com que **todas as telas pareçam uma conversa que os ouve de verdade**, solucionando de vez aquela impressão de estar passando por telas "repetidas". Modificarei o Javascript para injetar a escolha anterior direto na formação da pergunta seguinte.

## 2. A Comunicação com o Público CCB (Copywriting)

Para este público, a sinceridade, a simplicidade e a separação total entre dinheiro e fé são cruciais. A linguagem será acolhedora, usando termos familiares, mas **sem fazer nenhuma promessa enganosa, espiritual ou prosperidade material**. 

### Ajuste de Cultura (Regras que usarei no texto final):
*   **Vocabulário Inserido Naturalmente:** "luta", "prova", "comunhão", "simplicidade", "conselho na hora certa", "coração sincero".
*   **Linguagem Simples e Direta:** Usar o linguajar que aproxima, evitando jargões formais ("direcionamentos absolutos", "escala", etc.).
*   **A Abordagem do Pagamento (Etapa 12/13):** Deixarei extremamente claro que o valor de R$45 **não é uma venda do sagrado, nem se compra fé ou promessa**. É demonstrado como o "esforço comum" e o "custo" para sustentar os servidores, as ferramentas, e cuidar da organização mecânica do envio dessas mensagens todos os dias, deixando tudo em ordem sem depender de favores.

Abaixo, algumas demonstrações de como ficarão os textos com essa nova visão de irmandade:

> **(Etapas de Quebra de Muro e Reposicionamento):**
> "Sei bem que nessas lutas constantes ou cansaço dos dias, muitas vezes a gente procura conselhos, mas acaba escutando coisas lá fora que só não enchem nosso coração de paz verdadeira. Aqui conosco não trazemos promessas materiais feitas pelo homem ou milagres inventados na emoção. Nosso lado aqui é prático: um apoio simples e sincero de coração nos dias pesados."

> **(Etapas 12 e 13 - Pagamento Desvinculado da Fé):**
> "Para conservarmos a ordem sem as distrações que não convêm à nossa paz mental rotineira, decidimos abrir e firmar esse Grupo no WhatsApp. Serei muito honesto: nossa fé e as coisas de cima não têm preço estipulado, e o que te peço não é sobre 'bênçãos'.
> Contudo, para conseguirmos arcar com a tecnologia e pagar o tempo e atenção exclusiva de envio destas reflexões em paz, decidimos estipular uma única cooperação coletiva de 45 reais mensais. Nada além disso."
> *(Novos Botões)* -> "Compreendo, não é sobre a fé e sim a estrutura para o grupo ser amparado."

## User Review Required
> [!IMPORTANT]
> **Aprovação da Direção e Tom**
> Pode aprovar a estratégia da "Memória de Respostas" (que usará a opção clicada pelo usuário dentro do texto da próxima pergunta)? E o tom focado nesta simplicidade sem promessas espirituais e que desvincula o dinheiro da salvação está adequado ao que tem em mente?
> 
> *Assim que der o "OK", reescrevo e reprogramo 100% dos textos com todas essas adaptações inseridas.*
