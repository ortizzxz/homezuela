-- --- AUTH & USERS ---
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- 'user', 'agent', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    avatar_url TEXT,
    phone VARCHAR(20),
    bio TEXT,
    whatsapp VARCHAR(20)  
);

-- --- LISTINGS (Properties) ---
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Specs
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    listing_type VARCHAR(50),  
    listing_status VARCHAR(20), 
    
    -- Location
    city VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    address TEXT,
    
    -- Metadata
    is_new BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Supporting table for multiple images per property
CREATE TABLE listing_images (
    id SERIAL PRIMARY KEY,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    order_index INTEGER
);

-- --- BLOG SYSTEM ---
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id UUID REFERENCES users(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    language VARCHAR(2) NOT NULL, -- 'en' / 'es'
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT, -- Storing MD content directly for easier DB searching
    category VARCHAR(50),
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --- USER ENGAGEMENT ---
CREATE TABLE favorites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, listing_id)
);