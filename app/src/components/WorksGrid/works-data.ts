export type TagColor = 'blue' | 'orange' | 'green' | 'yellow' | 'purple' | 'red'

export interface Tag {
  label: string
  color: TagColor
}

export interface Project {
  id: string
  title: string
  date: string
  tags: Tag[]
  coverClass: string
  link: string
  size: 'large' | 'medium' | 'small'
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    id: 'pulkovo',
    title: 'Airport Resource Management System, Timeliner',
    date: '01.2021 – 12.2022',
    tags: [
      { label: 'Web', color: 'blue' },
      { label: 'B2B', color: 'orange' },
      { label: 'Research', color: 'green' },
      { label: 'Library', color: 'yellow' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'pulkovoCover',
    link: '/pulkovo',
    size: 'large',
  },
  {
    id: 'okey-app',
    title: "New mobile app for food retailer \"O'key\"",
    date: '09.2019 - 12.2021',
    tags: [
      { label: 'Android', color: 'blue' },
      { label: 'iOS', color: 'blue' },
      { label: 'B2C', color: 'orange' },
      { label: 'Research', color: 'green' },
      { label: 'Library', color: 'yellow' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'okeyAppCover',
    link: '/okey-app',
    size: 'medium',
  },
  {
    id: 'ya-calls',
    title: 'Yandex Control system hosted PBX — internal product',
    date: '06.2019 - 09.2019',
    tags: [
      { label: 'Web', color: 'blue' },
      { label: 'B2B', color: 'orange' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'pbhCover',
    link: '/ya-calls',
    size: 'medium',
  },
  {
    id: 'taxi',
    title: 'Concept for driver taxi app',
    date: '2020',
    tags: [
      { label: 'Android', color: 'blue' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'taxiCover',
    link: '/taxi',
    size: 'small',
  },
  {
    id: 'okey-site',
    title: "Concept for site \"O'key\"",
    date: '2020',
    tags: [
      { label: 'Web', color: 'blue' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'okeySiteCover',
    link: '/okey-site',
    size: 'small',
  },
  {
    id: 'pbx-ya',
    title: 'Yandex Control system hosted PBX',
    date: '06.2019 - 09.2019',
    tags: [
      { label: 'Web', color: 'blue' },
      { label: 'Mobile', color: 'blue' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
    ],
    coverClass: 'pbxyaCover',
    link: '',
    size: 'small',
    comingSoon: true,
  },
  {
    id: 'gpn',
    title: 'Document management system for GPN',
    date: '2021',
    tags: [
      { label: 'Web', color: 'blue' },
      { label: 'UX', color: 'purple' },
      { label: 'UI', color: 'purple' },
      { label: 'Library', color: 'yellow' },
    ],
    coverClass: 'gpnCover',
    link: '',
    size: 'small',
    comingSoon: true,
  },
]
