---
description: Professional responsive design implementation guide
---

# Professional Responsive Design Implementation

This workflow ensures all components are professionally responsive across all breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px).

## Responsive Breakpoint Standards

- **sm (640px)**: Mobile landscape / Small tablets
- **md (768px)**: Tablets
- **lg (1024px)**: Small desktops / Large tablets
- **xl (1280px)**: Desktop
- **2xl (1536px)**: Large screens

## Components Updated

### ✅ Completed
1. Footer - Fully responsive 4-column grid (1 col mobile, 2 col tablet, 4 col desktop)
2. Pagination - Theme-aware with proper spacing

### 🔄 In Progress
1. Hero Section - Responsive text sizing and button layout
2. Navbar - Mobile menu optimization
3. Listing Grid - Card layouts for different screens
4. Search Components - Filter responsiveness
5. Forms - Input field stacking

## Design Principles

1. **Mobile First**: Start with mobile layout, enhance for larger screens
2. **Touch-Friendly**: Minimum 44px touch targets on mobile
3. **Readable Text**: Scale typography appropriately (14-16px mobile, 16-18px desktop)
4. **Spacing**: Use responsive padding/margin (px-4 sm:px-6 lg:px-8)
5. **Grid Systems**: Leverage Tailwind's grid with responsive columns
6. **Images**: Proper aspect ratios and object-fit
7. **Navigation**: Mobile-friendly menus with hamburger on small screens

## Common Patterns

### Container Padding
```tsx
className="px-4 sm:px-6 md:px-8 lg:px-12"
```

### Responsive Grid
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
```

### Typography Scaling
```tsx
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

### Flexbox Direction
```tsx
className="flex flex-col md:flex-row gap-4"
```
