// utils/sitePackages.ts
//
// Pacotes de sessões (SiteContent.packages). O WL não tem seção de pacotes:
// no site atual, cada pacote aparece como um serviço da categoria dele
// ("Pacotes"), com o total de sessões no nome. É a mesma forma que o modelo
// Reabilitação já usava ("Pacote de 10 sessões" como serviço), agora gerada
// de um dado estruturado — o pacote continua sendo pacote nos dados, pronto
// para virar `Package` (API) quando o sistema completo tiver essa tela.
//
// Sem import de runtime (só `import type`): roda também em Node puro.
import type { SitePackage, SiteService } from '~/data/siteModels/types'

/** "5 sessões", "1 sessão", "4 sessões/mês". */
export function packageSessionsLabel(p: Pick<SitePackage, 'sessions' | 'period'>): string {
  const base = `${p.sessions} ${p.sessions === 1 ? 'sessão' : 'sessões'}`
  return p.period === 'month' ? `${base}/mês` : base
}

/** Nome do serviço que representa o pacote no site: "Recuperação Inicial (5 sessões)". */
export function packageServiceName(p: Pick<SitePackage, 'name' | 'sessions' | 'period'>): string {
  return `${p.name} (${packageSessionsLabel(p)})`
}

/** Pacote → serviço do WL (card com nome, descrição, preço e duração da sessão). */
export function packageAsService(p: SitePackage): SiteService {
  return {
    name: packageServiceName(p),
    description: p.description,
    price: p.price,
    durationMin: p.sessionMin,
    categoryId: p.categoryId,
  }
}

/** Serviços como o site os mostra: os do modelo e, depois, os pacotes. */
export function servicesWithPackages(content: { services: SiteService[]; packages?: SitePackage[] }): SiteService[] {
  return [...content.services, ...(content.packages ?? []).map(packageAsService)]
}
