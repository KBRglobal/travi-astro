import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testDb() {
  try {
    // Test 1: Get all contents (any status)
    console.log('📍 Testing ALL content...\n');
    const allContent = await prisma.contents.findMany({
      take: 10,
      select: {
        id: true,
        type: true,
        title: true,
        slug: true,
        status: true,
      },
      orderBy: { created_at: 'desc' },
    });

    console.log('Found', allContent.length, 'content items:');
    allContent.forEach((content, i) => {
      console.log(`\n${i + 1}. [${content.type}] ${content.title}`);
      console.log(`   - Slug: ${content.slug}`);
      console.log(`   - Status: ${content.status}`);
    });

    // Test 2: Count by content type
    console.log('\n\n📊 Content counts:');
    const counts = await prisma.contents.groupBy({
      by: ['type'],
      _count: true,
    });

    counts.forEach(({ type, _count }) => {
      console.log(`   - ${type}: ${_count}`);
    });

    // Test 3: Get published content
    console.log('\n\n✅ Published content:');
    const published = await prisma.contents.count({
      where: { status: 'published' },
    });
    console.log(`   Total published: ${published}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

testDb();
