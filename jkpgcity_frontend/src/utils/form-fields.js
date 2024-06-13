export const newNewsForm = {
    title: {
        type: "text",
        label: "Title",
        placeholder: "Enter title",
        id: "title"
    },
    content: {
        type: "textarea",
        label: "Content",
        placeholder: "Enter content",
        id: "content"
    },
    slug: {
        type: "text",
        label: "Slug",
        placeholder: "Enter slug",
        id: "slug"
    },
    image: {
        type: "file",
        label: "Image",
        placeholder: "Enter image",
        id: "image",
        accept: "image/*"
    },
    category: {
        type: "select",
        label: "Category",
        id: "category",
        options: [
            { value: "technology", label: "Technology" },
            { value: "science", label: "Science" },
            { value: "sport", label: "Sport" }
        ]
    },
    summary: {
        type: "textarea",
        label: "Summary",
        placeholder: "Enter summary",
        id: "summary"
    },
    published: {
        type: "select",
        options: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" }
        ],
        label: "Publish news",
        id: "published"
    }
}
export const newVenueForm = {
    name: {
        type: "text",
        label: "Name",
        placeholder: "Enter name",
        id: "name"
    },
    address: {
        type: "text",
        label: "Address",
        placeholder: "Enter address",
        id: "address"
    },
    category: {
        type: "text",
        label: "Category",
        placeholder: "Enter category",
        id: "category"
    },
    phone: {
        type: "text",
        label: "Phone",
        placeholder: "Enter phone",
        id: "phone"
    },
    email: {
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        id: "email"
    },
    website: {
        type: "text",
        label: "Website",
        placeholder: "Enter website",
        id: "website"
    },
    description: {
        type: "textarea",
        label: "Description",
        placeholder: "Enter description",
        id: "description"
    },
    image: {
        type: "file",
        label: "Image",
        id: "image"
    }
}

export const registerForm = {
    firstname: {
        type: "text",
        label: "First name",
        placeholder: "Enter first name",
        id: "first-name"
    },
    lastname: {
        type: "text",
        label: "Last name",
        placeholder: "Enter last name",
        id: "last-name"
    },
    email: {
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        id: "email"
    },
    password: {
        type: "password",
        label: "Password",
        placeholder: "Enter password",
        id: "password"
    },
    confirmPassword: {
        type: "password",
        label: "Confirm password",
        placeholder: "Confirm password",
        id: "confirm-password"
    },
    phone: {
        type: "text",
        label: "Phone",
        placeholder: "Enter phone",
        id: "phone"
    }
}

export const loginForm = {
    email: {
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        id: "email"
    },
    password: {
        type: "password",
        label: "Password",
        placeholder: "Enter password",
        id: "password"
    }
}

export const contactForm = {
    firstName: {
        type: "text",
        label: "First name",
        placeholder: "Enter first name",
        id: "first-name"
    },
    lastName: {
        type: "text",
        label: "Last name",
        placeholder: "Enter last name",
        id: "last-name"
    },
    email: {
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        id: "email"
    },
    phone: {
        type: "tel",
        label: "Phone",
        placeholder: "Enter phone",
        id: "phone"
    },
    message: {
        type: "textarea",
        label: "Message",
        placeholder: "Enter message",
        id: "message"
    }
}