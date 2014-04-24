using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	public Rigidbody2D llama;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (llama.transform.position.y < 0) {
			llama.transform.position.Set(llama.transform.position.x, llama.transform.position.y, 500);
		}
		if (Input.GetKeyDown(KeyCode.Space)) {
			llama.AddForce(new Vector2(0, 1000f));
		}
	}
}
