export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'projects',
                    title: 'Projects',
                    type: 'item',
                    url: '/projects',
                    icon: 'feather icon-cpu',
                },
                {
                    id: 'payments',
                    title: 'Payments',
                    type: 'item',
                    url: '/payments',
                    icon: 'feather icon-briefcase',
                }
            ]
        }
    ]
}