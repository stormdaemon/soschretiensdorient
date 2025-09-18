import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface Article {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .trim()
    .substring(0, 50); // Limit length
}

function extractTags(title: string): string[] {
  const commonTags = [
    'France', 'Europe', 'église', 'chrétien', 'profanation', 
    'vandalisme', 'christianophobie', 'persécution', 'discrimination'
  ];
  
  const titleLower = title.toLowerCase();
  const extractedTags: string[] = [];
  
  // Extract location-based tags
  if (titleLower.includes('france') || titleLower.includes('français')) extractedTags.push('France');
  if (titleLower.includes('allemagne') || titleLower.includes('allemand')) extractedTags.push('Allemagne');
  if (titleLower.includes('europe') || titleLower.includes('européen')) extractedTags.push('Europe');
  if (titleLower.includes('lyon')) extractedTags.push('Lyon');
  if (titleLower.includes('marne')) extractedTags.push('Marne');
  if (titleLower.includes('landes')) extractedTags.push('Landes');
  if (titleLower.includes('pyrénées')) extractedTags.push('Pyrénées-Atlantiques');
  
  // Extract action-based tags
  if (titleLower.includes('profan') || titleLower.includes('vandal')) extractedTags.push('profanation');
  if (titleLower.includes('cambriol') || titleLower.includes('vol')) extractedTags.push('vol');
  if (titleLower.includes('incendi') || titleLower.includes('brûl')) extractedTags.push('incendie');
  if (titleLower.includes('assassin') || titleLower.includes('tué') || titleLower.includes('meurtre')) extractedTags.push('violence');
  if (titleLower.includes('menac') || titleLower.includes('intimidation')) extractedTags.push('menaces');
  if (titleLower.includes('discrimin')) extractedTags.push('discrimination');
  
  // Extract target-based tags
  if (titleLower.includes('église') || titleLower.includes('basilique')) extractedTags.push('église');
  if (titleLower.includes('cimetière')) extractedTags.push('cimetière');
  if (titleLower.includes('chrétien') || titleLower.includes('chrétienne')) extractedTags.push('chrétien');
  if (titleLower.includes('prêtre') || titleLower.includes('curé')) extractedTags.push('clergé');
  if (titleLower.includes('vierge') || titleLower.includes('marie')) extractedTags.push('Vierge Marie');
  if (titleLower.includes('christ') || titleLower.includes('eucharistie')) extractedTags.push('eucharistie');
  
  // Ensure we have at least 2-3 relevant tags
  if (extractedTags.length === 0) {
    extractedTags.push('chrétien', 'France');
  }
  
  return [...new Set(extractedTags)].slice(0, 5); // Max 5 unique tags
}

function generateSummary(title: string, url: string): string {
  const summaries: { [key: string]: string } = {
    'chrétien irakien': 'Un chrétien irakien en fauteuil roulant a été assassiné en direct lors d\'un live TikTok à Lyon. Cette attaque tragique illustre la vulnérabilité des chrétiens qui témoignent publiquement de leur foi sur les réseaux sociaux.',
    'rapport oidac': 'Le rapport OIDAC 2023 révèle 2 444 incidents anti-chrétiens recensés en Europe, marquant une augmentation significative des actes de christianophobie sur le continent.',
    '27 églises': 'Vingt-sept églises ont été cambriolées et vandalisées dans les Landes et Pyrénées-Atlantiques, révélant une vague organisée d\'attaques contre le patrimoine religieux chrétien.',
    'profanation marne': 'Vol du corps du Christ dans l\'église Saint-Loup de Thillois dans la Marne. Cette profanation particulièrement grave touche au cœur de la foi catholique.',
    'statue vierge': 'Une statue de la Vierge Marie a été incendiée dans la basilique de Guingamp, acte de vandalisme ciblant spécifiquement les symboles de la dévotion mariale.',
    'sept églises pyrénées': 'Sept églises ont été cambriolées en quelques jours dans les Pyrénées-Atlantiques, créant un climat d\'insécurité dans les communautés chrétiennes locales.',
    'effondrement ault': 'L\'effondrement de l\'église d\'Ault symbolise l\'abandon progressif du patrimoine religieux français et la vulnérabilité des édifices non entretenus.',
    'allemagne crimes': 'Les crimes de haine anti-chrétiens ont doublé en Allemagne en un an, témoignant d\'une montée préoccupante de l\'hostilité envers les chrétiens en Europe.',
    'discrimination travail': 'Augmentation des cas de discrimination des chrétiens au travail et en société en Europe, révélant une christianophobie plus subtile mais répandue.',
    'attaques églises france': 'Multiplication des attaques contre les églises et cimetières chrétiens en France entre 2023 et 2024, créant un climat d\'insécurité pour les communautés.',
    'experts alertent': 'Des experts en droits religieux alertent sur la montée inquiétante des crimes anti-chrétiens en Europe et appellent à une meilleure protection.',
    'tabernacles objets': 'Recrudescence des attaques ciblant spécifiquement les tabernacles et objets sacrés dans les églises, révélant une connaissance des symboles religieux.',
    'prêtres menacés': 'Témoignages alarmants de prêtres menacés pour leur foi en France, illustrant la pression croissante exercée sur le clergé catholique.',
    'impact psychologique': 'L\'impact psychologique des profanations dans les petites paroisses est considérable, créant un sentiment d\'abandon et de vulnérabilité.',
    'analyse hostilité': 'Analyse révélant que l\'hostilité sociale subtile envers les chrétiens est souvent plus répandue que les profanations visibles.',
    'danger lives': 'Le cas d\'Ashur Sarnaya illustre les dangers auxquels s\'exposent les chrétiens qui témoignent de leur foi sur TikTok et les réseaux sociaux.',
    'églises ruine': 'Les églises historiques en ruine deviennent des cibles faciles pour le vandalisme, nécessitant une protection renforcée du patrimoine religieux.'
  };
  
  const titleLower = title.toLowerCase();
  
  for (const [key, summary] of Object.entries(summaries)) {
    if (titleLower.includes(key.split(' ')[0]) && titleLower.includes(key.split(' ')[1] || '')) {
      return summary;
    }
  }
  
  // Fallback generic summary
  return `Incident anti-chrétien rapporté illustrant la montée de la christianophobie en Europe. Cette situation préoccupante nécessite une attention particulière des autorités et de la société civile pour protéger les droits et la sécurité des communautés chrétiennes.`;
}

function generatePublishedDate(): string {
  // Generate dates between September 2024 and January 2025
  const startDate = new Date('2024-09-01');
  const endDate = new Date('2025-01-31');
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

function parseArticles(content: string): Article[] {
  const lines = content.split('\n').filter(line => line.trim());
  const articles: Article[] = [];
  
  for (let i = 0; i < lines.length; i += 2) {
    const titleLine = lines[i];
    const urlLine = lines[i + 1];
    
    if (!titleLine || !urlLine) continue;
    
    // Extract title (remove number prefix)
    const titleMatch = titleLine.match(/^\d+\.\s*(.+)$/);
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    const url = urlLine.trim();
    
    if (!url.startsWith('http')) continue;
    
    const id = generateSlug(title);
    const summary = generateSummary(title, url);
    const tags = extractTags(title);
    const publishedAt = generatePublishedDate();
    const image = `/src/assets/articles/${id}.jpg`;
    
    articles.push({
      id,
      title,
      summary,
      sourceUrl: url,
      publishedAt,
      tags,
      image
    });
  }
  
  return articles;
}

function main() {
  try {
    console.log('🔄 Ingestion des articles en cours...');
    
    // Read articles.txt
    const articlesPath = join(process.cwd(), 'articles.txt');
    const content = readFileSync(articlesPath, 'utf-8');
    
    // Parse and transform articles
    const articles = parseArticles(content);
    
    // Sort by published date (most recent first)
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // Write to src/data/articles.json
    const outputPath = join(process.cwd(), 'src/data/articles.json');
    writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
    
    console.log(`✅ ${articles.length} articles traités et sauvegardés dans ${outputPath}`);
    console.log('📊 Statistiques:');
    
    // Display statistics
    const tagCounts = articles.reduce((acc, article) => {
      article.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    console.log('   Tags les plus fréquents:');
    Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([tag, count]) => {
        console.log(`   - ${tag}: ${count} articles`);
      });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ingestion:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseArticles, generateSlug, extractTags, generateSummary };