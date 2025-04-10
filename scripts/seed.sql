INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2025-04-01', '2025-04-01', 'OPEN'),
('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-03-15', '2025-03-20', 'ORDERED'),
('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2025-02-10', '2025-02-11', 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
('11111111-1111-1111-1111-111111111111', '2c2ee9c5-53a8-4ecd-9fee-f7b16f18e666', 2),  -- Wireless Headphones
('11111111-1111-1111-1111-111111111111', '9288e97c-e8bc-4d49-bb3c-cfd081be5416', 1),  -- ProductTitle

('22222222-2222-2222-2222-222222222222', '714685c5-4946-4f76-a2d0-62c9d9b606e4', 1),  -- iPad Air
('22222222-2222-2222-2222-222222222222', 'ca850b79-a7c7-459f-b553-496b6a4fd34c', 2);  -- iPhone 14 Pro
