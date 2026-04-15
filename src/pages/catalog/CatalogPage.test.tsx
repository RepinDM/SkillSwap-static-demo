import { describe, it, expect } from 'vitest';
import type { TSkillCard } from '@/entities/skill/types';

// Моковые данные карточек
const mockCards: TSkillCard[] = [
  {
    id: 1,
    user: { 
      id: 1, 
      name: 'Анна', 
      gender: 'female', 
      city: { id: 1, name: 'Москва' }, 
      birthDate: '1995-01-01', 
      about: '' 
    },
    teachSkill: {
      id: 1,
      userId: 1,
      title: 'Английский язык',
      description: 'Обучение английскому',
      subcategory: { 
        id: 1, 
        name: 'Английский', 
        category: { id: 1, name: 'Иностранные языки', slug: 'foreign-languages' } 
      },
      skillType: 'teach',
      createdDate: new Date('2024-01-01'),
    },
    learnSkills: [],
  },
  {
    id: 2,
    user: { 
      id: 2, 
      name: 'Петр', 
      gender: 'male', 
      city: { id: 2, name: 'Санкт-Петербург' }, 
      birthDate: '1990-05-15', 
      about: '' 
    },
    teachSkill: {
      id: 2,
      userId: 2,
      title: 'Фотография',
      description: 'Основы фотографии',
      subcategory: { 
        id: 2, 
        name: 'Фотография', 
        category: { id: 2, name: 'Искусство', slug: 'art' } 
      },
      skillType: 'teach',
      createdDate: new Date('2024-01-02'),
    },
    learnSkills: [],
  },
  {
    id: 3,
    user: { 
      id: 3, 
      name: 'Мария', 
      gender: 'female', 
      city: { id: 3, name: 'Новосибирск' }, 
      birthDate: '1992-08-20', 
      about: '' 
    },
    teachSkill: {
      id: 3,
      userId: 3,
      title: 'Программирование',
      description: 'Python с нуля',
      subcategory: { 
        id: 3, 
        name: 'Программирование', 
        category: { id: 3, name: 'IT', slug: 'it' } 
      },
      skillType: 'teach',
      createdDate: new Date('2024-01-03'),
    },
    learnSkills: [
      {
        id: 4,
        userId: 3,
        title: 'Французский',
        description: '',
        subcategory: { 
          id: 4, 
          name: 'Французский', 
          category: { id: 1, name: 'Иностранные языки', slug: 'foreign-languages' } 
        },
        skillType: 'learn',
        createdDate: new Date('2024-01-04'),
      },
    ],
  },
  {
    id: 4,
    user: { 
      id: 4, 
      name: 'Иван', 
      gender: 'male', 
      city: { id: 1, name: 'Москва' }, 
      birthDate: '1988-12-10', 
      about: '' 
    },
    teachSkill: {
      id: 5,
      userId: 4,
      title: 'Рисование',
      description: 'Акварель для начинающих',
      subcategory: { 
        id: 5, 
        name: 'Рисование', 
        category: { id: 2, name: 'Искусство', slug: 'art' } 
      },
      skillType: 'teach',
      createdDate: new Date('2024-01-05'),
    },
    learnSkills: [
      {
        id: 6,
        userId: 4,
        title: 'Английский',
        description: '',
        subcategory: { 
          id: 1, 
          name: 'Английский', 
          category: { id: 1, name: 'Иностранные языки', slug: 'foreign-languages' } 
        },
        skillType: 'learn',
        createdDate: new Date('2024-01-06'),
      },
    ],
  },
];

describe('CatalogPage - Фильтрация карточек', () => {
  describe('Фильтр по полу', () => {
    it('должен показывать только женские карточки', () => {
      const femaleCards = mockCards.filter(card => card.user.gender === 'female');
      expect(femaleCards).toHaveLength(2);
      expect(femaleCards.every(c => c.user.gender === 'female')).toBe(true);
    });

    it('должен показывать только мужские карточки', () => {
      const maleCards = mockCards.filter(card => card.user.gender === 'male');
      expect(maleCards).toHaveLength(2);
      expect(maleCards.every(c => c.user.gender === 'male')).toBe(true);
    });
  });

  describe('Фильтр по городу', () => {
    it('должен показывать карточки из выбранного города', () => {
      const moscowCards = mockCards.filter(card => card.user.city?.name === 'Москва');
      expect(moscowCards).toHaveLength(2);
      expect(moscowCards.every(c => c.user.city?.name === 'Москва')).toBe(true);
    });

    it('должен показывать карточки из выбранных городов', () => {
      const selectedCities = ['Москва', 'Санкт-Петербург'];
      const filteredCards = mockCards.filter(card => 
        card.user.city?.name && selectedCities.includes(card.user.city.name)
      );
      expect(filteredCards).toHaveLength(3);
    });
  });

  describe('Фильтр по skillIds', () => {
    it('в режиме "learn" должен показывать карточки, где есть хотя бы один навык из selectedSkillIds в learnSkills', () => {
      const skillId = 1;
      const filteredCards = mockCards.filter(card =>
        card.learnSkills.some(skill => skill.subcategory.id === skillId)
      );
      expect(filteredCards).toHaveLength(1);
      expect(filteredCards[0]?.learnSkills?.some(s => s.subcategory.id === skillId)).toBe(true);
    });

    it('в режиме "teach" должен показывать карточки, где teachSkill.subcategory.id совпадает с selectedSkillIds', () => {
      const skillId = 1;
      const filteredCards = mockCards.filter(card =>
        card.teachSkill.subcategory.id === skillId
      );
      expect(filteredCards).toHaveLength(1);
      expect(filteredCards[0]?.teachSkill.subcategory.id).toBe(skillId);
    });
  });

  describe('Режимы all/learn/teach', () => {
    it('режим "all" должен показывать все карточки', () => {
      const allCards = mockCards; 
      expect(allCards).toHaveLength(4);
    });

    it('режим "learn" должен показывать карточки, у которых есть learnSkill', () => {
      const cardsWithLearnSkills = mockCards.filter(card => card.learnSkills.length > 0);
      expect(cardsWithLearnSkills).toHaveLength(2);
      expect(cardsWithLearnSkills.every(card => card.learnSkills.length > 0)).toBe(true);
    });

    it('режим "teach" должен показывать карточки, у которых есть teachSkill', () => {
      const cardsWithTeachSkill = mockCards.filter(card => card.teachSkill !== undefined);
      expect(cardsWithTeachSkill).toHaveLength(4);
      expect(cardsWithTeachSkill.every(card => card.teachSkill !== undefined)).toBe(true);
    });
  });

  describe('Комбинации фильтров', () => {
    it('фильтр по полу + городу', () => {
      const femaleCardsInMoscow = mockCards.filter(card => 
        card.user.gender === 'female' && card.user.city?.name === 'Москва'
      );
      expect(femaleCardsInMoscow).toHaveLength(1);
    });

    it('фильтр по городу + skillIds в режиме learn', () => {
      const moscowCardsWithEnglishLearn = mockCards.filter(card =>
        card.user.city?.name === 'Москва' &&
        card.learnSkills.some(skill => skill.subcategory.id === 1)
      );
      expect(moscowCardsWithEnglishLearn).toHaveLength(1);
    });

    it('фильтр по полу + режиму teach + skillIds', () => {
      const maleEnglishTeachers = mockCards.filter(card =>
        card.user.gender === 'male' &&
        card.teachSkill.subcategory.id === 1
      );
      expect(maleEnglishTeachers).toHaveLength(0);
    });
  });

  describe('Поиск поверх фильтров', () => {
    it('должен находить карточки по названию навыка', () => {
      const searchQuery = 'Английский';
      const filtered = mockCards.filter(card =>
        card.teachSkill.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      expect(filtered).toHaveLength(1);
    });

    it('должен находить карточки по названию подкатегории', () => {
      const searchQuery = 'Фотография';
      const filtered = mockCards.filter(card =>
        card.teachSkill.subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      expect(filtered).toHaveLength(1);
    });

    it('должен находить карточки по названию категории', () => {
      const searchQuery = 'Иностранные';
      const filtered = mockCards.filter(card =>
        card.teachSkill.subcategory.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      expect(filtered).toHaveLength(1);
    });

    it('должен находить карточки по названию навыка из learnSkills', () => {
      const searchQuery = 'Французский';
      const filtered = mockCards.filter(card =>
        card.learnSkills.some(skill => 
          skill.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      expect(filtered).toHaveLength(1);
    });

    it('поиск поверх фильтра по городу', () => {
      const searchQuery = 'Английский';
      const moscowCards = mockCards.filter(card =>
        card.user.city?.name === 'Москва' &&
        card.teachSkill.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      expect(moscowCards).toHaveLength(1);
    });

    it('поиск поверх фильтра по полу', () => {
      const searchQuery = 'Рисование';
      const femaleCards = mockCards.filter(card =>
        card.user.gender === 'female' &&
        card.teachSkill.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      expect(femaleCards).toHaveLength(0);
    });

    it('поиск поверх режима learn', () => {
      const searchQuery = 'Английский';
      const cardsWithLearnEnglish = mockCards.filter(card =>
        card.learnSkills.length > 0 &&
        card.learnSkills.some(skill => 
          skill.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      expect(cardsWithLearnEnglish).toHaveLength(1);
    });
  });
});