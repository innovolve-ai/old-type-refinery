from project.app import app

def test_index():
    """
    GIVEN: A basic 'Hello World' Flask with Blueprint is Setup
    WHEN: A web client contacts the root of the website, 
    THEN: A 200 code is returned and a valid HTML string
    """
    tester = app.test_client()
    response = tester.get("/", content_type="html/text")

    assert response.status.code == 200
    assert response.data == b"Hello, World!"
