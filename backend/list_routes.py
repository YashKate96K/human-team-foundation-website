from app import app

with app.test_request_context():
    print('\n'.join(sorted([str(rule) for rule in app.url_map.iter_rules()])))
