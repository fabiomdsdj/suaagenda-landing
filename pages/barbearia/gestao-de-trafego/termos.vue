<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-200">
    <div class="max-w-5xl mx-auto px-6 py-20">

      <h1 class="text-5xl font-black text-white mb-4">
        Termos e Condições de Uso
      </h1>

      <p class="text-zinc-500 mb-12">
        Última atualização: {{ dataAtual }}
      </p>

      <div class="space-y-12">

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            1. Aceitação
          </h2>

          <p>
            Ao utilizar a plataforma SuaAgenda e seus recursos,
            o usuário declara estar de acordo com estes Termos e
            Condições de Uso.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            2. Sobre o Serviço
          </h2>

          <p>
            O SuaAgenda é uma plataforma destinada ao gerenciamento
            de agendamentos, relacionamento com clientes e utilização
            de ferramentas de automação e inteligência artificial.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            3. Módulo SuaAgenda IA
          </h2>

          <p>
            O módulo SuaAgenda IA utiliza inteligência artificial
            para auxiliar na criação, otimização e monitoramento
            de campanhas publicitárias.
          </p>

          <p class="mt-4">
            A utilização da tecnologia não constitui garantia de
            faturamento, lucro, crescimento financeiro ou quantidade
            específica de clientes.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            4. Investimento em Anúncios
          </h2>

          <p>
            O investimento realizado em Google Ads ou plataformas
            similares é de responsabilidade exclusiva do cliente.
          </p>

          <p class="mt-4">
            Os valores destinados aos anúncios são pagos diretamente
            às plataformas de mídia e não representam receita da
            SuaAgenda.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            5. Garantia SuaAgenda IA
          </h2>

          <p>
            Clientes elegíveis poderão receber isenção do valor
            referente ao módulo SuaAgenda IA caso a campanha não
            gere pelo menos 5 agendamentos confirmados de clientes
            novos durante os primeiros 30 dias.
          </p>

          <p class="mt-4">
            A elegibilidade será determinada automaticamente pelos
            registros existentes na plataforma.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            6. Limitações da Garantia
          </h2>

          <ul class="list-disc pl-6 space-y-3">
            <li>A garantia não cobre valores investidos em anúncios.</li>
            <li>A garantia não gera reembolso em dinheiro.</li>
            <li>A garantia não se aplica a sistemas externos.</li>
            <li>A garantia não é válida para campanhas interrompidas.</li>
            <li>A garantia não é válida sem integração correta do Google Ads.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            7. Responsabilidades do Cliente
          </h2>

          <ul class="list-disc pl-6 space-y-3">
            <li>Fornecer informações corretas.</li>
            <li>Manter os dados atualizados.</li>
            <li>Utilizar a plataforma de forma legal.</li>
            <li>Registrar corretamente os agendamentos.</li>
            <li>Manter acesso válido às integrações utilizadas.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            8. Limitação de Responsabilidade
          </h2>

          <p>
            A SuaAgenda não será responsável por prejuízos financeiros,
            perdas comerciais, lucros cessantes ou qualquer impacto
            decorrente de fatores externos ao funcionamento da plataforma.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            9. Alterações
          </h2>

          <p>
            Estes termos poderão ser alterados a qualquer momento,
            sem aviso prévio, para adequação legal ou operacional.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            10. Foro
          </h2>

          <p>
            Fica eleito o foro da comarca da sede da empresa para
            resolução de eventuais controvérsias relacionadas ao uso
            da plataforma.
          </p>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataAtual = new Date().toLocaleDateString('pt-BR')

useSeoMeta({
  title: 'Termos e Condições de Uso',
  description: 'Termos e condições de uso da plataforma SuaAgenda.'
})
</script>